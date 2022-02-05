import React, { useState, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { slideDownVariant, scaleVariant, addNoteVariant } from "../framer-motion/motion";
import { DarkContext } from "../contexts/DarkContext";
import Speech from './Speech'
import Editor from './Editor'

export default function AddContainer({ add }) {
  const { isDark, colors } = useContext(DarkContext);
  const { background, color } = isDark ? colors.dark : colors.light;

  const titleRef = useRef('')
  const [content, setContent] = useState('')
  const [showAdd, setShowAdd] = useState(false);
  const [error, setError] = useState(false);

  const addToNotes = (e) => {
    e.preventDefault();
    if (content.trim() !== "") {
      add({ title: titleRef.current.value, content: content });
      setContent('')
      titleRef.current.value = ''
      setError(false);
      return;
    }
    setError(true);
  };

  const clickAdd = () => {
    setShowAdd(!showAdd);
  };

  const speechInput = (str) => {
    setContent(current => current += str)
  }

  const display = () => {
    if (!showAdd)
      return (
        <motion.div id="heading" style={{ color }} variants={addNoteVariant} whileHover='hover'
          animate="animate" initial='initial'>
          <h1>Jot down a note...</h1>
          <i className="material-icons " id="addBtn" onClick={() => clickAdd()}>
            &#xe148;
          </i>
        </motion.div>
      );
    return (
      <motion.form
        onSubmit={(e) => addToNotes(e)}
        style={{ background, color }}
        variants={slideDownVariant}
        initial="initial"
        animate="animate"
      >
        <input ref={titleRef} placeholder='title' type='text' style={{ background, color }} autoFocus={true} />
        <Editor contentState={{ content, setContent }} />
        <div className="btnCon">
          <span
            id="exit"
            onClick={() => {
              setShowAdd(!showAdd);
            }}
          >
            X
          </span>
          {error && (
            <motion.span
              id="error"
              variants={scaleVariant}
              initial="initial"
              animate="animate"
            >
              Required
            </motion.span>
          )}
          <input type="submit" value="Save" id="save" />
          <Speech speechInput={speechInput} />
        </div>
      </motion.form>
    );
  };

  return <div className="addCon">{display()}</div>;
}
