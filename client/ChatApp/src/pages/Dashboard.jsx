import ChatBox from "../assets/components/ChatBox"
import Navbar from "../assets/components/Navbar"
import SendMessage from "../assets/components/SendMessage"


const Dashboard = () => {
    return(
        <>
            <Navbar/>
            <div>
                <ChatBox/>
                <SendMessage/>
            </div>
        </>
    )
}

export default Dashboard