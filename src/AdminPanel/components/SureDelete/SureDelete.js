import { deleteById } from '../../AdminPanel';
import { Modal } from "react-bootstrap";
import "./SureDelete.scss"
function SureDelete(props) {

    return(    

        <Modal className='delete-window' backdrop="static" keyboard={false} {...props} aria-labelledby="deleteWindow">
            <Modal.Header closeButton>
            <Modal.Title id="deleteWindow">
                Ви впевнені?
            </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid delete-window">
                <Modal.Body>
                    <p>Видалити <b>{props.tittle}</b> ?</p>
                </Modal.Body>
                    <Modal.Footer className='p-0'>
                        <button type="button" className="btn btn-secondary" onClick={props.onHide}>
                        Ні</button>
                        <button onClick={() => deleteById(props.type, props.id)} type="button" className="btn btn-danger">
                        Так</button>
                    </Modal.Footer>
            </Modal.Body>
        </Modal>

    );
};

export default SureDelete;






