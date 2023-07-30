import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

const Dweet = ( {dweetObj, isOwner} ) => {
    const [editing, setEditing] = useState(false);
    const [newDweet, setNewDweet] = useState(dweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제 하시겠습니까?");
       if (ok) {
            await deleteDoc(doc(dbService, "dweets", dweetObj.id));
       }
    }

    const toggleEditing = () => {
        setEditing((prev) => !prev);
    }

    const onChange = (event) => {
        const { target : {value}} = event;
        setNewDweet(event.target.value);
    }
    
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(doc(dbService, "dweets", dweetObj.id), { text: newDweet })
        setEditing(false);
    }

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} value={newDweet} required/>
                        <input type="submit" value="업데이트" />
                    </form>
                    <button onClick={toggleEditing}> 취소</button>    
                </>
            ):(
                <>
                    <h4>{dweetObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>삭제</button>
                            <button onClick={toggleEditing}>수정</button>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default Dweet;