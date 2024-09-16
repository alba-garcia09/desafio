import { useState, useRef } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 3.5rem;
  height: 3rem;
  border: 0;
  background: transparent;
  gap: .5rem;
  cursor: pointer;

  & > div.line {
    background: ${ props => props.$linesColor || 'white' };
    width: 100%;
    height: 2px;
    border-radius: 5px;
    transition: all .5s;
    transform-origin: left;
  }

  &.open div.line:first-child {
    transform: rotate(35deg);
    width: 2.2;
  }

  &.open div.line:nth-child(2) {
    opacity: 0;
  }

  &.open div.line:last-child {
    transform: rotate(-35deg);
    width: 2.2;
  }
`

const Aside = styled.div`
  display: flex;
  flex-direction: column;
  width: 0px;
  height: ${ props => props.height };
  background-color: ${ props => props.$backgroundColor };
  z-index: 1;
  position: fixed;
  left: 0;
  top: ${ props => props.top };
  transition: width ${ props => props.$animationTime }ms;

  &.open {
    width: ${ props => props.width };
  }

  & > * {
    margin-left: -${ props => props.width };
    transition: margin-left ${ props => props.$animationTime }ms;
    padding: 0.5rem;
  }

  &.open > * {
    margin-left: 0;
  }
`

const Item = styled.p`
  margin: 0;
  padding: 1rem;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`

function MobileSideBar(props) {
  const navigate = useNavigate();
  const {
    children,
    animationTime=800,
    asideMarginTop='10vh',
    asideWidth='100vw',
    asideHeight='90vh',
    asideColor='#6313F2',
    linesColor='white'
  } = props

  const [open, setOpen] = useState(false)
  const [openClass, setOpenClass] = useState(false)
  const timeoutId = useRef()

  function tooglePanel() {
    clearTimeout(timeoutId.current)
    if (!openClass) {
      setOpen(true)
      setTimeout(() => {
        setOpenClass(true)
      }, 1)
    } else {
      setOpenClass(false)
      timeoutId.current = setTimeout(() => {
        setOpen(false)
      }, animationTime)
    }
  }

  function handleItemClick(path) {
    navigate(path)
    tooglePanel()
  }

  return (
    <>
      <Button onClick={tooglePanel} className={openClass ? 'open' : ''} $linesColor={linesColor}>
        <div className='line'/>
        <div className='line'/>
        <div className='line'/>
      </Button>
      {open &&
        <Aside
          top={asideMarginTop}
          width={asideWidth}
          height={asideHeight}
          className={openClass ? 'open' : ''}
          $animationTime={animationTime}
          $backgroundColor={asideColor}
        >
          {
            <>
              <Item onClick={() => handleItemClick('/program')}>Programa</Item>
              <Item onClick={() => handleItemClick('/agenda')}>One2Ones</Item>
              <Item onClick={() => handleItemClick('/tickets')}>Entradas</Item>
              <Item onClick={() => handleItemClick('/prizes')}>Premios Digit</Item>
              <Item onClick={() => handleItemClick('/accommodation')}>Alojamiento</Item>
            </>
          }
        </Aside>
      }
    </>
  )
}

export default MobileSideBar
