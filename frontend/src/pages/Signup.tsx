import { Box,Typography, Button  } from '@mui/material'
import { IoIosLogIn } from "react-icons/io";
import CustomizedInput from "../components/shared/CustomisedInput"
import React, { useEffect } from 'react'
import {toast} from "react-hot-toast" ;
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const auth = useAuth();
  const navigate= useNavigate();
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formdata=new FormData(e.currentTarget);
    const name= formdata.get("name") as string;
    const email= formdata.get("email") as string;
    const password=formdata.get("password") as string;
    console.log(email,password);
     try{
      toast.loading("Signing In ",{id:"login"});
         await auth?.signup(name,email,password);
      toast.success("signed In Successfully",{id:"login"})
      navigate("/");
     }
     catch(err){
      console.log(err);
      toast.error("signed In Failed");
     }
  }
  useEffect(()=>{
    if(auth?.user){
      return navigate('/chat');
    }
  },[auth]);
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
    <Box padding={6} ml={15} display={{ md: "flex", sm: "none", xs: "none" }}>
      <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
    </Box>
    <Box
      display={"flex"}
      flex={{ xs: 1, md: 0.5 }}
      justifyContent={"center"}
      alignItems={"center"}
      padding={2}
      ml={"auto"}
      mt={16}
    >
      <form
      onSubmit={handleSubmit}
        style={{
          margin: "auto",
          padding: "30px",
          boxShadow: "10px 10px 20px #000",
          borderRadius: "10px",
          border: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            padding={2}
            fontWeight={600}
          >
            SignUp
          </Typography>
          <CustomizedInput type="text" name="name" label="Name" />
          <>
          <br/>
          </>
          <CustomizedInput type="email" name="email" label="Email" />
          <>
          <br/>
          </>
          <CustomizedInput type="password" name="password" label="Password" />
          <Button
            type="submit"
            sx={{
              px: 2,
              py: 1,
              mt: 2,
              width: "430px",
              borderRadius: 2,
              bgcolor: "#00fffc",
              ":hover": {
                bgcolor: "white",
                color: "black",
              },
            }}
            endIcon={<IoIosLogIn />}
          >
            SignUp
          </Button>
        </Box>
      </form>
    </Box>
  </Box>
  )
}

export default Signup