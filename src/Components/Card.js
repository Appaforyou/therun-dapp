import {Col} from "react-bootstrap";

export const Card = ({title, imageSrc, onClick, description}) => {
  return (
    <div className="modalCard" onClick={onClick}>
      <Col>
        <p>{title}</p>
        {description && (<p style={{fontSize: 10}}>Easy-to-use browser extension</p>)}
      </Col>
      <img
        src={imageSrc}/>
    </div>
  )
}
