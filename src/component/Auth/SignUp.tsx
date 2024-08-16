import * as React from "react";
import { useState } from "react";
// import { Formik, FormikProps } from "formik";
import { Formik, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { setUser, setLoading, User } from "../../store/slices/authSlice";

export const SignUp = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const formRef = React.useRef<FormikProps<User>>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues: User = {
    email: "",
    password: "",
    phonenumber: 0,
  };

  const signInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    phonenumber: Yup.number(),
    password: Yup.string().required("Password is required"),
  });

  const handleToggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSubmit = (values: any) => {
    if (!!values) {
      if (!isSignIn) {
        createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        ).then((response: any) => {
          // Signed in
          const user = response.user;
          //update profile
          if (auth.currentUser) {
            console.log(auth);
            updateProfile(auth.currentUser, {
              displayName: !!user.email ? user.email.split("@")[0] : "testuser",
            }).then((response: any) => {
              // Profile updated!
              if (auth.currentUser) {
                const { uid, email, displayName } = auth.currentUser;
                const userEmail: string = !!email ? email : "";
                dispatch(
                  setUser({
                    uid: uid,
                    email: userEmail,
                    displayName: displayName,
                  })
                );
                dispatch(setLoading(true));
              }
            });
          }
          navigate("/dashboard");
        });
      } else {
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then((response: any) => {
            if (auth.currentUser) {
              const { uid, email, displayName } = auth.currentUser;
              const username: string =
                displayName === "" && !!email
                  ? email.split("@")[0]
                  : "testuser";
              const userEmail: string = !!email ? email : "";
              dispatch(
                setUser({
                  uid: uid,
                  email: userEmail,
                  displayName: username,
                })
              );
              dispatch(setLoading(true));
            }
            navigate("/");
          })
          .catch((error) => {});
      }
    }
  };

  // const handleCheck = () => {
  //   toast("Woohh");
  // };

  return (
    <div className="form">
      <h1>{isSignIn ? "Signup" : "Signin"}</h1>
      {!isSignIn ? (
        <p>
          Don't have an account yet?{" "}
          <button onClick={handleToggleSignIn}>Signup here</button>
        </p>
      ) : (
        <button onClick={handleToggleSignIn}>Back to signin</button>
      )}
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        onSubmit={(values: User) => {
          if (!!values) {
            handleSubmit(values);
          }
        }}
        validationSchema={signInSchema}
      >
        {({ values, errors, handleChange, touched, handleBlur }) => (
          <form>
            {!isSignIn ? (
              <>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <span className="error">
                  {errors.email && touched.email && errors.email}
                </span>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <span className="error">
                  {errors.password && touched.password && errors.password}
                </span>
              </>
            ) : (
              <>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <span className="error">
                  {errors.email && touched.email && errors.email}
                </span>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <span className="error">
                  {errors.password && touched.password && errors.password}
                </span>
                <input
                  type="phonenumber"
                  name="phonenumner"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phonenumber}
                />
                <span className="error">
                  {errors.phonenumber &&
                    touched.phonenumber &&
                    errors.phonenumber}
                </span>
              </>
            )}

            <button
              type="submit"
              disabled={false}
              onClick={(e: any) => {
                e.preventDefault();
                if (formRef.current) {
                  formRef.current.submitForm();
                }
              }}
            >
              {isSignIn ? "SignUp" : "SignIn"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
