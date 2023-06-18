import { Link } from "react-router-dom"

const LoginScreen = () => {
    return(
        <div className="row justify-content-center">
            <h1 class="text-center">Welcome Back to Zinema!</h1>

            <form className="w-50 text-center">

                <div class="form-group p-2">
                    <input type="email" class="form-control form-control-sm rounded-3" id="InputEmailOrPhone" placeholder="Email or Phone Number"></input>
                </div>

                <div class="form-group p-2">
                    <input type="password" class="form-control form-control-sm rounded-3" id="InputPassword" placeholder="Password">
                    </input>
                </div>

                <button type="submit" class="row btn btn-warning fw-bold rounded-pill m-3 mb-0">
                    <Link className="text-dark text-decoration-none fw-bold" to={``}>
                        Login
                    </Link>
                </button>

                <button type="submit" class="row btn btn-outline-warning fw-bold rounded-pill m-3 mb-0">
                    <Link className="text-warning text-decoration-none fw-normal" to={`/`}>
                        Back
                    </Link>
                </button>
                
            </form>

        </div>
    )
}

export default LoginScreen