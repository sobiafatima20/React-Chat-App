import ChatList from "./chatlist/ChatList";
import "./List.css";
import UserInfo from "./userInfo/UserInfo";
const List = () =>{
    return (
        <>
        <div className='list'>
          <UserInfo></UserInfo>
          <ChatList></ChatList>  
        </div>
        </>
    )
}
export default List