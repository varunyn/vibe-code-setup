# AI Agent Database Developer

## Introduction

This path is for developers who want to build AI agents that do more than answer prompts by giving them durable memory backed by Oracle AI Database.

---

### What You Will Learn

- How Oracle AI Database can support agent memory patterns
- How to think about agent behavior beyond single-turn responses
- What a database-backed agent architecture looks like in practice

---

### Your Coaches

<div class="coach-grid">
  <div class="coach-card">
    <img src="../../persona-selection/images/Chinmay.png" alt="Chinmay" />
    <p>Chinmay</p>
  </div>
  <div class="coach-card">
    <img src="../../persona-selection/images/Varun.png" alt="Varun" />
    <p>Varun</p>
  </div>
</div>

---

### Before You Start

- Use this path if you are most interested in agent architecture and memory design
- This lab is a strong fit when you want to connect database capabilities to AI agent behavior

> **Green Button Event Codes:** If you are using the HOL with pre-provisioned Green Button environments, use the event code that matches your session:
>
> - **Session 1:** `09287-TNFL-MSSU`
> - **Session 2:** `09290-YKJE-NQTB`

> **Note:** Complete the tasks below only if you are using your own database. If you are using the lab-provided database, continue to **Start Here**.

- If you have configured OCI CLI in Step 10, Task 4, continue with the steps below to create and test the database credentials and Select AI profile

<details>
<summary><strong>Task 1: Create the database user and grant initial privileges</strong></summary>

Run the following SQL statements as the `ADMIN` user:

- Replace `<PASSWORD>` with the actual credential before execution.

Create the `AI4U` database user:

```sql
CREATE USER AI4U IDENTIFIED BY "<PASSWORD>";
```

Grant the required roles and set the default roles:

```sql
GRANT CONNECT TO AI4U;
GRANT CONSOLE_DEVELOPER TO AI4U;
GRANT DWROLE TO AI4U;
GRANT GRAPH_DEVELOPER TO AI4U;
GRANT OML_DEVELOPER TO AI4U;
GRANT RESOURCE TO AI4U;
GRANT SPATIAL_AUTHOR TO AI4U;

ALTER USER AI4U DEFAULT ROLE
  CONNECT,
  CONSOLE_DEVELOPER,
  DWROLE,
  GRAPH_DEVELOPER,
  OML_DEVELOPER,
  RESOURCE,
  SPATIAL_AUTHOR;
```

Enable REST access and data sharing:

```sql
BEGIN
  ORDS_ADMIN.ENABLE_SCHEMA(
    p_enabled => TRUE,
    p_schema => 'AI4U',
    p_url_mapping_type => 'BASE_PATH',
    p_url_mapping_pattern => 'ai4u',
    p_auto_rest_auth => TRUE
  );

  C##ADP$SERVICE.DBMS_SHARE.ENABLE_SCHEMA(
    schema_name => 'AI4U',
    enabled => TRUE
  );

  COMMIT;
END;
/
```

Enable Graph, Spatial, and OML proxy access:

```sql
ALTER USER AI4U GRANT CONNECT THROUGH GRAPH$PROXY_USER;
ALTER USER AI4U GRANT CONNECT THROUGH SPATIAL$PROXY_USER;
ALTER USER AI4U GRANT CONNECT THROUGH OML$PROXY;
```

Set the tablespace quota:

```sql
ALTER USER AI4U QUOTA UNLIMITED ON "DATA";
```

</details>

<details>
<summary><strong>Task 2: Create a credential to access OCI Gen AI Service and Object Storage</strong></summary>

Before creating the database credential, make sure your OCI user has an API signing key. If you have not created one yet, follow the Oracle documentation for [adding an API signing key](https://docs.oracle.com/en-us/iaas/Content/Identity/access/to_upload_an_API_signing_key.htm).

To generate a new API signing key from the OCI Console:

1. Open the profile menu, then select **My Profile**.
2. Under **Resources**, select **API keys**.
3. Select **Add API key**.
4. Select **Generate API key pair**.
5. Download the private key and save it in your `.oci` directory.
6. Select **Add**.
7. Copy the configuration file preview values for `user`, `fingerprint`, `tenancy`, and `region`.
8. Update the private key file permissions:

   ```bash
   chmod go-rwx ~/.oci/<oci_api_keyfile>.pem
   ```

If you already have an API key pair, use **Choose public key file** or **Paste a public key** in the **Add API key** dialog, then copy the same configuration file preview values.

Use those values to fill in `user_ocid`, `tenancy_ocid`, `private_key`, and `fingerprint` in the credential creation block below.

Run the following PL/SQL as the `AI4U` user:

```sql
BEGIN
  DBMS_CLOUD.CREATE_CREDENTIAL (
    credential_name => '{enter_credential_name}',
    user_ocid => 'ocid1.user.oc1......',
    tenancy_ocid => 'ocid1.tenancy.oc1......',
    private_key => '-----BEGIN PRIVATE KEY-----
M..................
-----END PRIVATE KEY-----',
    fingerprint => '3e:...............:ee'
  );
END;
/
```

</details>

<details>
<summary><strong>Task 3: Confirm the OCI credential exists</strong></summary>

After creating the credential, confirm that it exists for the current user:

```sql
select * from user_credentials;
```

</details>

<details>
<summary><strong>Task 4: Test the OCI API credential</strong></summary>

This tests connectivity to OCI Object Storage.

```sql
SELECT * FROM DBMS_CLOUD.LIST_OBJECTS(
  '{oci_cred_from_Task_3_1}',
  'https://objectstorage.{region}.oraclecloud.com/n/{namespace}/b/{bucket_name}/o/'
);
```

This tests connectivity to OCI Gen AI Service.

```sql
set serveroutput on;
DECLARE
  -- https://docs.oracle.com/en-us/iaas/Content/generative-ai/pretrained-models.htm
  gen_ai_endpoint varchar2(500) := 'https://inference.generativeai.us-chicago-1.oci.oraclecloud.com';
  gen_ai_model varchar2(500) := 'cohere.command-a-03-2025';
  compartment_ocid varchar2(500) := 'ocid1.compartment.oc1..aaa';
  api_cred_name varchar2(500) := '{oci_cred_from_Task_3_1}';
  ai_prompt varchar2(4000) := 'who is Babe Ruth?';
  resp dbms_cloud_types.RESP;
BEGIN
  resp := dbms_cloud.send_request(
    credential_name => api_cred_name,
    uri => gen_ai_endpoint || '/20231130/actions/chat',
    method => dbms_cloud.METHOD_POST,
    body => utl_raw.cast_to_raw(json_object(
      'compartmentId' value compartment_ocid,
      'servingMode' value
        (json_object(
          'modelId' value gen_ai_model,
          'servingType' value 'ON_DEMAND'
        )),
      'chatRequest' value
        (json_object(
          'message' value ai_prompt,
          'apiFormat' value 'COHERE',
          'maxTokens' value 2000,
          'temperature' value 0.75,
          'frequencyPenalty' value 0,
          'presencePenalty' value 0,
          'topP' value 1.0,
          'topK' value 0,
          'isStream' value false
        ))
      ))
    );
  dbms_output.put_line(dbms_cloud.get_response_text(resp));
END;
/
```

</details>

<details>
<summary><strong>Task 5: Create the Select AI for RAG profile</strong></summary>

For more details on creating a profile and the associated attributes, see the following Oracle documentation:

- DBMS_CLOUD_AI Package
- Create and Set an AI Profile
- Profile Attributes

Run the following PL/SQL as the `AI4U` user:

```sql
BEGIN
    DBMS_CLOUD_AI.CREATE_PROFILE(
        profile_name => 'genai',
        attributes   => q'~{
            "provider": "oci",
            "credential_name": "{Use the credentials name From task 2}",
            "region": "us-chicago-1",
            "comments": true,
            "conversation": true,
            "model": "xai.grok-4.3",
            "oci_apiformat": "GENERIC",
            "oci_compartment_id": "ocid1.compartment.oc1..aaaaaaaakxzgihbpmrwlgeyhcy5zqlgafweidsd5j4pnuanjhisgxatq7era"
        }~'
    );
END;
```

</details>

<details>
<summary><strong>Task 6: Confirm the Select AI profile attributes</strong></summary>

After creating the profile, confirm the profile and its attributes:

```sql
select a.profile_name, a.status, b.attribute_name, b.attribute_value
from user_cloud_ai_profiles a
join user_cloud_ai_profile_attributes b
  on a.profile_id = b.profile_id;
```

</details>

<details>
<summary><strong>Task 7: Log in to Oracle Machine Learning</strong></summary>

Use the Oracle Machine Learning public access URL from the database tool configuration, then log in with the `AI4U` user created in Task 1.

<img src="../../persona-selection/images/ai-agent-database-developer/oml-tool-configuration.png" alt="Oracle Machine Learning public access URL in the database tool configuration" />

On the Oracle Machine Learning login page, enter the database user and password created in Task 1.

<img src="../../persona-selection/images/ai-agent-database-developer/oml-login-database-credentials.png" alt="Oracle Machine Learning login page using the AI4U database credentials" />

After you log in, continue with the lab guide instructions.

</details>

### Start Here

<div class="persona-cta">
  <a href="https://livelabs.oracle.com/ords/r/dbpm/livelabs/view-workshop?clear=RR,180&wid=4315">Launch Lab</a>
</div>

---

### Customer Workshops

If you want to run this lab with a customer, contact the Code Innovate team in [**#codeinnovate**](https://oracle.enterprise.slack.com/app_redirect?channel=codeinnovate).
