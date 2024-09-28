import { useState } from "react";
import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import { doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import "./Detail.css";


const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  // States to control visibility of sections
  const [isChatSettingsOpen, setChatSettingsOpen] = useState(false);
  const [isPrivacyHelpOpen, setPrivacyHelpOpen] = useState(false);
  const [isSharedPhotosOpen, setSharedPhotosOpen] = useState(false);
  const [isSharedFilesOpen, setSharedFilesOpen] = useState(false);

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  // Example functions for different actions:
  const muteNotifications = () => {
    
  };

  const changeBackground = () => {
    console.log("Chat Background Changed");
  };

  const clearChatHistory = () => {
    console.log("Chat History Cleared");
  };

  const viewPrivacyPolicy = () => {
    console.log("Privacy Policy Viewed");
  };

  const contactSupport = () => {
    console.log("Contacting Support...");
  };

  const downloadPhoto = (photoName) => {
    console.log(`Downloading photo: ${photoName}`);
  };

  const downloadFile = (fileName) => {
    console.log(`Downloading file: ${fileName}`);
  };

  return (
    <>
      <div className="detail">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <h2>{user?.username}</h2>
          <p>Lorem ipsum, dolor sit amet.</p>
        </div>

        <div className="info">
          {/* Chat Settings */}
          <div className="option">
            <div className="title" onClick={() => setChatSettingsOpen(!isChatSettingsOpen)}>
              <span>Chat Settings</span>
              <img src={isChatSettingsOpen ? "./arrowUp.png" : "./arrowDown.png"} alt="" />
            </div>
            {isChatSettingsOpen && (
              <div className="content">
                <button onClick={muteNotifications}>Mute Notifications</button>
                <button onClick={changeBackground}>Change Chat Background</button>
                <button onClick={clearChatHistory}>Clear Chat History</button>
              </div>
            )}
          </div>

          {/* Privacy & Help */}
          <div className="option">
            <div className="title" onClick={() => setPrivacyHelpOpen(!isPrivacyHelpOpen)}>
              <span>Privacy & Help</span>
              <img src={isPrivacyHelpOpen ? "./arrowUp.png" : "./arrowDown.png"} alt="" />
            </div>
            {isPrivacyHelpOpen && (
              <div className="content">
                <button onClick={viewPrivacyPolicy}>View Privacy Policy</button>
                <button onClick={contactSupport}>Contact Support</button>
              </div>
            )}
          </div>

          {/* Shared Photos */}
          <div className="option">
            <div className="title" onClick={() => setSharedPhotosOpen(!isSharedPhotosOpen)}>
              <span>Shared Photos</span>
              <img src={isSharedPhotosOpen ? "./arrowUp.png" : "./arrowDown.png"} alt="" />
            </div>
            {isSharedPhotosOpen && (
              <div className="photos">
                <div className="photoItem">
                  <div className="photoDetail">
                    <img src="./detail.PNG" alt="" />
                    <span>photo_2024_2.png</span>
                  </div>
                  <img
                    src="./download.png"
                    alt=""
                    className="icon"
                    onClick={() => downloadPhoto("photo_2024_2.png")}
                  />
                </div>
                <div className="photoItem">
                  <div className="photoDetail">
                    <img src="./detail.PNG" alt="" />
                    <span>photo_2024_3.png</span>
                  </div>
                  <img
                    src="./download.png"
                    alt=""
                    className="icon"
                    onClick={() => downloadPhoto("photo_2024_3.png")}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Shared Files */}
          <div className="option">
            <div className="title" onClick={() => setSharedFilesOpen(!isSharedFilesOpen)}>
              <span>Shared Files</span>
              <img src={isSharedFilesOpen ? "./arrowUp.png" : "./arrowDown.png"} alt="" />
            </div>
            {isSharedFilesOpen && (
              <div className="content">
                <div className="fileItem">
                  <span>file_2024_1.pdf</span>
                  <img
                    src="./download.png"
                    alt=""
                    className="icon"
                    onClick={() => downloadFile("file_2024_1.pdf")}
                  />
                </div>
                <div className="fileItem">
                  <span>file_2024_2.docx</span>
                  <img
                    src="./download.png"
                    alt=""
                    className="icon"
                    onClick={() => downloadFile("file_2024_2.docx")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Detail;
