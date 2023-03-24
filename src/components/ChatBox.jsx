import { useState , useEffect} from "react";
import {lens,loading} from "../assets";

import axios from "axios";

import { SectionWrapper } from "../hoc";
import "../App.css"

import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";

import { styles } from "../styles";



const ChatBox = () => {
    const [prompt, setPrompt] = useState(undefined);
    const [loading,setLoading] = useState(false);
    const [answer, setAnswer] = useState(undefined);
    useEffect(() => {
        if (prompt != null && prompt.trim() === "") {
          setAnswer(undefined);
        }
      }, [prompt]);
    const sendPrompt = async (event) =>{
        if(event.key !== "Enter"){
            
            return;
        }
        try {
            setLoading(true);
            
            const requestOptions = {
                method: "POST",
                headers: {"Conetent-Type":"application/json"},
                body: JSON.stringify({prompt})
            };
            // const res = await ("/api/ask", requestOptions)

            axios.post("http://35.168.3.231:8080/ask", { prompt })
            .then(res => {
              // console.log(res.message);
              console.log(res.data.message);
              setAnswer(res.data.message);
            })
            console.log("This is the name if the file");
            
           
            
        } catch (error) {
            console.log(error, "err");
        }
        finally{
            setLoading(false);
        }
        console.log("prompt",prompt)
    }
    return (
      <>
       <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Ask Question About me
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Open AI
        </h2>
      </motion.div>
      <motion.div className="app">
      <div className="app-container">
        <div className="spotlight__wrapper">
          <input
            type="text"
            className="spotlight__input"
            placeholder="Ask me anything..."
            style={{
              backgroundImage: loading ?`url(${loading})` : `url(${lens})`,
            }}
            disabled={loading}
            
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown = {(e) => sendPrompt(e)}
          />
          <div className="spotlight__answer ">
            {answer && <p>{answer}</p>}
          </div>
        </div>
      </div>
    </motion.div>
      
      </>
        
    
    );
    
}
export default SectionWrapper(ChatBox, "chatbox");
