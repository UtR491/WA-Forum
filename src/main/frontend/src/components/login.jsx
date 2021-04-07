import React from "react";
// import ReactDOM from 'react-dom';
import "./formstyle.css";

function Form({ option }) {
  return (
    <form className="account-form" onSubmit={(evt) => evt.preventDefault()}>
      <div
        className={
          "account-form-fields " +
          (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
        }
      >
        <input
          id="registrationNumber"
          name="registrationNumber"
          type="text"
          placeholder="Enter your registration number"
          required
        />

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required={option === 1 || option === 2 ? true : false}
        />

        <input
          id="repeat-password"
          name="repeat-password"
          type="password"
          placeholder="Repeat password"
          required={option === 2 ? true : false}
          disabled={option === 1 || option === 3 ? true : false}
        />

        <input
          id="displayName"
          name="Name"
          type="text"
          placeholder="Enter your full Name"
          required={option === 2 ? true : false}
          disabled={option === 1 ? true : false}
        />

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          required={option === 2 ? true : false}
          disabled={option === 1 || option === 3 ? true : false}
        />
        <input
          id="codechef"
          name="codechef"
          type="text"
          placeholder="Codechef Username"
          required={option === 2 ? true : false}
          disabled={option === 1 || option === 3 ? true : false}
        />

        <input
          id="github"
          name="github"
          type="text"
          placeholder="github Username"
          required={option === 2 ? true : false}
          disabled={option === 1 || option === 3 ? true : false}
        />

        <input
          id="codeforces"
          name="codeforces"
          type="text"
          placeholder="Codeforces Username"
          required={option === 2 ? true : false}
          disabled={option === 1 || option === 3 ? true : false}
        />
      </div>
      <button className="btn-submit-form" type="submit">
        {option === 1 ? "Sign in" : option === 2 ? "Sign up" : "Reset password"}
      </button>
    </form>
  );
}

function App() {
  const [option, setOption] = React.useState(1);

  return (
    <div className="container">
      <h1>WA-Forum</h1>
      <header>
        <div
          className={
            "header-headings " +
            (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
          }
        >
          <span>Sign in to your account</span>
          <span>Create an account</span>
        </div>
      </header>
      <ul className="options">
        <li
          className={option === 1 ? "active" : ""}
          onClick={() => setOption(1)}
        >
          Sign in
        </li>
        <li
          className={option === 2 ? "active" : ""}
          onClick={() => setOption(2)}
        >
          Sign up
        </li>
      </ul>
      <Form option={option} />
    </div>
  );
}

// ReactDOM.render(<App/>, document.getElementById("root"));

export default App;
