import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

type SignupInput = {
    name: string,
    email: string,
    password: string
};

export const Auth = () => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs, {
                headers: {
                    'Content-Type': 'application/json',
                    // Add other headers if needed
                    // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                }
            
            });
            const jwt = response.data;
            localStorage.setItem('token', jwt);
        } catch (e) {
            alert("error while signing up");
            console.log(e);
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="text-5xl font-bold">
                    Sign Up
                </div>
            </div>
            <div className="flex justify-center pt-4 text-xl text-gray-500 ">
                Already have an account?
                <Link to={'/signin'} className="pl-2 underline underline-offset-1">Login</Link>
            </div>
            <div className="flex justify-center">
                <div className="w-1/2 pt-5">
                    <LabelledInput label='Email' placeholder="Enter your email" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        });
                    }} />
                    <LabelledInput label='Password' placeholder="Enter your password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        });
                    }} />
                    <LabelledInput label='Username' placeholder="Enter your username" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        });
                    }} />
                </div>
            </div>
            <div className="flex justify-center mt-8">
            <button type="button" onClick={sendRequest} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-28 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700">
                Sign up
            </button>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function LabelledInput({ label, placeholder, onChange }: LabelledInputType) {
    return (
        <div className="p-2">
            <label className="block mb-2 text-xl font-medium text-gray-900">{label}</label>
            <input onChange={onChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    );
}