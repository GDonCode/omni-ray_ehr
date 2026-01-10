import "../globals.css";
import Image from "next/image";
export default function Login() {
    return (
        <div className="bg-white">
            <Image src="/logo.png" alt="Clinic Logo" width={150} height={150} className="mx-auto my-8" />
            <h1>Take control of your health</h1>
            <p>Login to your account</p>
            <form>
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}