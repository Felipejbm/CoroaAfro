import {
    Box,
    Typography
  } from "@mui/material";
  
  export default function FooterSection({
  
    title,
    items,
    icon
  
  }){
  
    return(
  
      <Box>
  
        <Typography
  
          sx={{
  
            color:"#fff",
  
            fontSize:"1.5rem",
  
            mb:1,
  
            fontWeight:300
  
          }}
  
        >
  
          {title}
  
        </Typography>
  
        {
  
          items.map((item,index)=>(
  
            <Box
  
              key={index}
  
              display="flex"
  
              alignItems="center"
  
              gap={1}
  
              mb={0.5}
  
            >
  
              {icon}
  
              <Typography
  
                sx={{
  
                  color:"#d1d1d1"
  
                }}
  
              >
  
                {item}
  
              </Typography>
  
            </Box>
  
          ))
  
        }
  
      </Box>
  
    )
  
  }