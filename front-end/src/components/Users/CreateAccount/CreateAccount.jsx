import "./CreateAccount.scss";
const SERVER_URL = "http://localhost:8080";

function CreateAccount() {
  return (
    <div>
      <div>Congregate!!! Your account is successfully created...</div>
      <a href={`${SERVER_URL}/auth/google`}>Click here to login</a>
    </div>
  );
}

export default CreateAccount;
