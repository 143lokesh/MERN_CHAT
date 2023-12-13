import {createContext,useState,useEffect,ReactNode,useContext} from 'react'
import { LoginUser, LogoutUser, SignUpUser, checkAuthStatus } from '../helpers/ApiCommunicators';
type User={
    name:string;
    email:string;
}
type UserAuth={
    isLoggedIn:boolean;
    user:User|null;
    login:(email:string,password:string)=>Promise<void>;
    signup:(name:string,email:string,password:string)=>Promise<void>;
    logout:()=>Promise<void>;

}
const AuthContext = createContext<UserAuth | null>(null);
 export const AuthProvider =({children}:{children:ReactNode})=>{
    const [user,setuser]=useState<User| null>(null);
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    useEffect(() => {
            async function checkStatus(){
                const data = await checkAuthStatus();
                if(data){
                    setuser({email:data.email,name:data.name});
                    setIsLoggedIn(true);
                }
            }
            checkStatus()
    }, [])
    const login = async (email:string,password:string)=>{
        const data = await LoginUser(email,password);
        if(data){
            setuser({email:data.email,name:data.name});
            setIsLoggedIn(true);
        }
    };
    const logout = async()=>{
        await LogoutUser();
        setIsLoggedIn(false);
        setuser(null);
    };
    const signup = async(name:string,email:string,password:string)=>{
        const data = await SignUpUser(name,email,password);
        setIsLoggedIn(true);
        setuser({email:data.email,name:data.name});
        
    }
    const value={
        user,isLoggedIn,login,logout,signup
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);