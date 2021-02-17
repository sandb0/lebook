# API Reference

> All the service APIs of this application are organized around REST.
>
> The APIs have predictable resource-oriented URLs.
>
> It returns JSON-encoded responses and uses standard HTTP response codes and authentication.

## Table of Contents

- [API Reference of Services](#api-reference-of-services).
- [Errors](#errors).

## API Reference of Services

To view the API Reference for each of the services in this application, visit this [document](https://github.com/sandb0/lebook/tree/main/docs/backend#services-documentation).

## Errors

> LeBook uses conventional HTTP response codes to indicate the success or failure of an API request.
>
> Codes in the **2xx range** indicate success.
>
> Codes in the **4xx range** indicate an error due to faults in the information provided. For example, a required parameter has been omitted or validation has failed, etc.
>
> Codes in the **5xx range** indicate an error in the API or the servers (these are rare).

<details><summary>HTTP Stadus Code Summary</summary>

- `200 - OK`.
- `201 - Created`.
- `400 - Bad Request`.
- `500 - Internal Server Error`.

</details>

### Error Response

```json
{
  "message": "invalid email or password"
}
```

<details><summary>Error Object</summary>

- `message`: `String` - The human-readable error message.

</details>
