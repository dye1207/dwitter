import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import Dweet from "components/Dweet"

const Home = ( {userObj}) => {
    const [dweet, setDweet] = useState("");
    const [dweets, setDweets] = useState([]);
    const [attachement, setAttachMent] = useState("");


    useEffect(() => {
        onSnapshot(collection(dbService, "dweets"), (snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data()
            }))
            setDweets(newArray);
        })
        // const getDweets = async () => {
        //     const dbDweets = await getDocs(collection(dbService, "dweets"))
        //     dbDweets.forEach((document) => {
        //         const dweetObject = {...document.data(), id: document.id };
        //         setDweets((prev) => [dweetObject, ...prev]);
        //     });
        // }
        // getDweets();
    }, [])
        //처음 한번 실행 => 글 등록 1. 의존성배열 [] 에 값을 넣어서 새로고침 2. firebase 기능 이용 => Snapshot 실시간 글 db감지 변경되었을떄 다시 코드 바꿔서

    console.log(dweets);

    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "dweets"), {
            text: dweet,
            createAt: Date.now(),
            creatorId: userObj.uid
        });
        setDweet("");
    }

    const onChange = (event) => {
        event.preventDefault();
        const {target: {value}} = event;
        setDweet(value);
    }

    const onFileChange = (event) => {
        const { target: { files } }=event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget : {result}} = finishedEvent;
            setAttachMent(result);
        }
        reader.readAsDataURL(theFile);
        //사진에 대한 URL
    }
    const onClearAttachMent = () => {
        setAttachMent("");
    }
    return (
        <>
            <form>
                <input onChange={onChange} value={dweet} type="text" placeholder="내용을 입력해 주세요." maxLength={200}
                />
                <input onChange={onFileChange} type="file" accept="image/*" />
                <input onClick={onSubmit} type="submit" value="등록" />
                {attachement && (
                    <div>
                        <img src={attachement} width="50px" height="50px" alt=".."/>
                        <button onClick={onClearAttachMent}>취소</button>
                    </div>
                )}
            </form>
            <div>
                {dweets.map((dweet => {
                            //카운터변수 -> 객체 -> {createAt text id}
                    return (
                        <Dweet 
                        key={dweet.id} 
                        dweetObj = {dweet} 
                        isOwner={dweet.creatorId === userObj.uid}
                                //작성된 글의 uid     현재 로그인사람 uid

                        />
                        // <div key={dweet.id}>
                        //     <h4>{dweet.text}</h4>
                        // </div>
                    )
                }))}
            </div>
        </>
    )
}


export default Home;