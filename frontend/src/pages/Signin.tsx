import { AuthSignin } from "../components/AuthSignin"
import { Quote } from "../components/Quote"


export const Signin = () => {
    return <div className="grid grid-cols-2">
    <div>
        <AuthSignin/>
    </div>
    <div className="invisible md:visible">
        <Quote/>
    </div>
</div>
}