import {
    Box,
    Typography,
    IconButton
  } from "@mui/material";
  
  import GitHubIcon from "@mui/icons-material/GitHub";
  import InstagramIcon from "@mui/icons-material/Instagram";
  
  export default function FooterBrand() {
  
    return (
  
      <Box display="flex" gap={2}>
  
        <Box
          component="img"
          src="./img/coroa.png"
          alt="Coroa Afro"
          sx={{
            width: 70,
            height: 70,
            borderRadius: "50%"
          }}
        />
  
        <Box>
  
          <Typography
            sx={{
              color:"#fff",
              fontWeight:300,
              fontSize:"2rem"
            }}
          >
            COROA AFRO
          </Typography>
  
          <Typography
            sx={{
              color:"#d1d1d1",
              fontSize:"1.3rem"
            }}
          >
            Fortalecendo laços
          </Typography>
  
          <Box mt={1}>
  
            <IconButton sx={{color:"#fff"}}>
  
              <GitHubIcon/>
  
            </IconButton>
  
            <IconButton sx={{color:"#fff"}}>
  
              <InstagramIcon/>
  
            </IconButton>
  
          </Box>
  
        </Box>
  
      </Box>
  
    );
  
  }