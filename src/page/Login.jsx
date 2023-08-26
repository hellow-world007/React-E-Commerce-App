import React,{ useState,useEffect } from "react"
import { useLocation,useNavigate,Navigate } from "react-router-dom"
import { loginUser } from "../api"

export default function Login() {
    const [ loginFormData, setLoginFormData ] = React.useState({ email: "", password: "" })
    const [ status, setStatus ] = React.useState('idle')
    const [ error, setError ] = React.useState(null)
    const [ glasses, setGlasses ] = useState([])
    const [ correct,setCorrect ] = useState(false)

    useEffect(() => {
      async function loadVans() {
          // setLoading(true)
          setStatus("submitting")
          try {
              const data = await loginUser()
              setGlasses(data[0])
          } catch (err) {
              setError(err)
          } finally {
              // setLoading(false)
              setStatus("idle")
          }
      }
  
      loadVans()
    }, [])

    const navigate = useNavigate();
    // const location = useLocation()
    // console.log(location)
    // let from = location.state?.from?.pathname || "/home";

    function handleSubmit(e) {
        e.preventDefault()
            if(glasses.email === loginFormData.email && glasses.password === loginFormData.password){
              localStorage.setItem("loggedin", true)
              setCorrect(true)
            }
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            <h1>Log in to your account</h1>
            <h2>
                Use email: joy@gmail.com &&
                password: 123@456 for now.
            </h2>
            {
                error?.message &&
                    <h3 className="login-error">{error.message}</h3>
            } 

            {correct && (
              <Navigate to="/shop" replace={true} />
            )}

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address..."
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password..."
                    value={loginFormData.password}
                />
                <button disabled={status === 'submitting'}>
                   {status === "submitting" 
                        ? "Logging in..." 
                        : "Log in"
                    }
                </button>
            </form>
        </div>
    )

}