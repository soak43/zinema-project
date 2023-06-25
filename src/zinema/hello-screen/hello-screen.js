import { Link } from "react-router-dom"

const HelloScreen = () => {
    return(
        <div className="row justify-content-center">

            {/* Left card */}
            <div className="col-lg-4 row-md m-4 flex-grow-1 border rounded-3">

                <div className="row-2 align-items-center m-0 p-4 border-bottom">
                    <h1 className="fw-bold">Standard</h1>
                    <p className="m-0">The essentials at a great price.</p>

                </div>

                <div className="row-8 align-items-center m-0 pt-2 pb-2 border-bottom">
                    <ul className="list-group list-group-flush">
                        <li className="list-unstyled mb-1 border-0 ">Stream in Full HD quality</li>

                        <li className="list-unstyled mb-1 border-0">2 concurrent streams</li>
                        
                    </ul>
                </div>
                
                <div className="row-2 align-items-center m-0 p-2">
                    <p className="fs-1 fw-bold m-0">7.99/mo</p>

                    <button type="button" class="btn btn-warning fw-bold rounded-pill m-3">
                        <Link className="text-dark text-decoration-none " to={`./register`}>
                        Sign up</Link>
                    </button>
                </div>
                
            </div>

            {/* Right card */}

            <div className="col-lg-4 row-md m-4 border flex-grow-1 rounded-3">

                <div className="row-2 align-items-center m-0 p-4 border-bottom">
                    <h1 className="fw-bold">Premium</h1>
                    <p className="m-0">Because you deserve all the best.</p>

                </div>

                <div className="row-8 align-items-center m-0 pt-2 pb-2 border-bottom">
                    <ul className="list-group list-group-flush">
                        <li className="list-unstyled mb-1 border-0 ">Password Sharing</li>

                        <li className="list-unstyled mb-1 border-0 ">Premium Content</li>
                        <li className="list-unstyled mb-1 border-0 ">Stream in Ultra HD/4K quality</li>

                        <li className="list-unstyled mb-1 border-0 ">Up to 6 concurrent streams</li>
                        
                    </ul>
                </div>
                
                <div className="row-2 align-items-center m-0 p-2">
                    <p className="fs-1 fw-bold m-0">16.99/mo</p>

                    <button type="button" class="btn btn-warning fw-bold rounded-pill m-3">
                        <Link className="text-dark text-decoration-none" to={`./register`}>
                        Sign up</Link>
                    </button>
                </div>
                
            </div>

            <div className="row justify-content-center">
                <p className="m-0">Already a member?</p>


                <button type="submit" class=" w-25 row btn btn-warning fw-bold rounded-pill m-3 mb-0">
                    <Link className="text-dark text-decoration-none" to={`./login`}>
                        Login
                    </Link>
                </button>

            </div>

        </div>
    )
}

export default HelloScreen;