import React from "react";
import "../NavWindow.scss"
import SureDelete from "../../SureDelete/SureDelete";
import NavEdit from "./NavEdit";


function Value({content, type}) {
    const [deleteShow, setDeleteShow] = React.useState(false);
    const [editShow, setEditShow] = React.useState(false);

    return(
        <>
        <tr className="value">
            <td>
                <p>{content.name}</p>
            </td>
            <td>
                <button onClick={() => setEditShow(true)} type="button">
                    <img src="/imgjs/icons/edit.svg" alt="" />
                </button>
            </td>
        </tr>
        <SureDelete id={content.id} type={type}  tittle={content.name} show={deleteShow} onHide={() => setDeleteShow(false)} />
        <NavEdit id={content.id} type={type} name={content.name} englishName={content.englishName}  show={editShow} onHide={() => setEditShow(false)}/>
        </>
    );
};

export default Value;
