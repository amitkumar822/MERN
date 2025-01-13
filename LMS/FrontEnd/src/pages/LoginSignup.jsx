import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"

const LoginSignup = () => {
    const navigate = useNavigate();
    const [registerUser, { data: regData, error: regError, isLoading: regIsLoading, isSuccess: regIsSuccess }] = useRegisterUserMutation()
    const [loginUser, { data: logData, error: logError, isLoading: logIsLoading, isSuccess: logIsSuccess }] = useLoginUserMutation();

    const [signupInput, setSignupInput] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [loginInput, setLoginInput] = useState({
        email: "",
        password: "",
    })

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value });
        } else if (type === "login") {
            setLoginInput({ ...loginInput, [name]: value });
        }
    }

    const handleSubmit = async (type) => {
        const inputData = type === "signup" ? signupInput : loginInput;
        const action = type === "signup" ? registerUser : loginUser;
        const rep = await action(inputData);
        console.log("Response: ", rep)
    }

    useEffect(() => {
        if (regIsSuccess && regData) {
            toast.success(regData?.message || "Signup Success.");
        }
        if (regError) {
            toast.error(regError?.data?.message || "Signup Failed.");
        }
        if (logIsSuccess && logData) {
            navigate("/");            
            toast.success(logData?.message || "Login Successful.");
        }
        if (logError) {
            toast.error(logError?.data?.message || "Login Failed.");
        }
    }, [regIsLoading, logIsLoading, regData, logData, regError, logError])

    return (
        <div className="flex items-center w-full justify-center mt-20">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>

                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Create a new account and click signup when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={signupInput?.name} onChange={(e) => changeInputHandler(e, "signup")} type="text" placeholder="Enter Your Name!" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" value={signupInput?.email} onChange={(e) => changeInputHandler(e, "signup")} type="email" placeholder="Enter Your Email!" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" value={signupInput?.password} onChange={(e) => changeInputHandler(e, "signup")} type="password" placeholder="Enter Your Password!" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handleSubmit("signup")} className="w-full">{
                                regIsLoading ? <>
                                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait...
                                </> : "Signup"
                            }</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login your password here. After signup, you'll be logged in.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" value={loginInput?.email} onChange={(e) => changeInputHandler(e, "login")} type="email" placeholder="Enter Your Email!" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" value={loginInput?.password} onChange={(e) => changeInputHandler(e, "login")} type="password" placeholder="Enter Your Password!" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handleSubmit("login")} className="w-full">{
                                logIsLoading ? <>
                                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait...
                                </> : "Login"
                            }</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default LoginSignup