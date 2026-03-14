import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ButtonTimer from '../components/ButtonTimer';
import Sidebar from '../components/Sidebar';
import JustifySafelyContainer from '../components/JustifySafelyContainer';
import { DonutScene } from '../components/Donut';


export default function HomePage({ userId }: { userId: string }) {

  const [enteredRoomId, setEnteredRoomId] = useState('');
  const [roomIdSubmitted, setroomIdSubmitted] = useState(false);

  // scroll to top of page automatically
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // navigate to room page when roomId submitted
  const navigate = useNavigate();
  useEffect(() => {
    if (roomIdSubmitted) navigate(`/room/${enteredRoomId}`);
  }, [roomIdSubmitted]);


  const roomCodeSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setroomIdSubmitted(true);
  };



  // to make a new room before automatically being sent there
  const handleCreateRoom = async () => {
    const adminId = { userId };
    const response = await fetch('/api/room', {
      method: 'POST',
      body: JSON.stringify(adminId),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 201) {
      const data = await response.json();
      setEnteredRoomId(data.newRoomCode);
      setroomIdSubmitted(true);
    }

    else if (response.status === 403) {
      const data = await response.json();
      alert(`Failed to create room: ${data.error}`);
    }

    else {
      alert(`Failed to create room: ${response.status}`);
    }
  };

  return (
    <>
      <Sidebar />
      <JustifySafelyContainer justifyType='evenly' className="d-flex flex-column text-center align-items-center h-100 m-auto">
        <Row className='mx-2 my-5 mb-1 my-lg-5 py-lg-5'>
          <h1 className='rock-salt-regular'>Frinkxit</h1>
          <h4>A Mashup of <em>The Simpsons</em> and <em>Dixit</em></h4>

        </Row>
        <DonutScene />
        <Row className='justify-content-center mx-2 my-5 mt-1 py-lg-5'>
          <Row>
            <h5>To play, create a room or join an existing room.</h5>
            <Col>
              <ButtonTimer className="my-3" onClick={handleCreateRoom}>Create Room</ButtonTimer>
            </Col>
          </Row>
          <JoinRoomForm {...{ enteredRoomId, setEnteredRoomId, roomCodeSubmit }} />
        </Row>
      </JustifySafelyContainer>
    </>
  );
}


function JoinRoomForm({ enteredRoomId, setEnteredRoomId, roomCodeSubmit }: {
  enteredRoomId: string;
  setEnteredRoomId: (value: string) => void;
  roomCodeSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {

  const isButtonDisabled = enteredRoomId.length !== 4;
  return (
    <Row className="justify-content-center">
      <h5 className="mt-3 mt-lg-5">Join Existing Room</h5>
      <form onSubmit={roomCodeSubmit}>
        <div className="form-group">
          <div className="d-flex justify-content-center mb-1 gap-2">
            <div className="d-flex align-items-center">
              <label className="my-0" htmlFor="input-code">
                Room Code:
              </label>
            </div>
            <div style={{ width: '80px' }}>
              <input
                className="form-control text-center"
                type="text"
                id="input-code"
                name="input-room-code"
                required
                maxLength={4}
                placeholder="XYZW"
                pattern="[A-Z]{4}"
                value={enteredRoomId}
                onChange={(e) => setEnteredRoomId(e.target.value.toUpperCase())}
              />
            </div>
          </div>
          <Button className="my-2" type="submit" disabled={isButtonDisabled}>
            Join!
          </Button>
        </div>
      </form>
    </Row>);
}