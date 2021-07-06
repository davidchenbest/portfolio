export const notesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      action.note.date = new Date() + ''
      return [action.note, ...state];
    case "EDIT":
      let arr = [...state];
      arr[action.id].title = action.note.title;
      arr[action.id].content = action.note.content;
      return arr;
    case "REMOVE":
      return state.filter((item, index) => index !== action.id);
    case "SET":
      return action.notes;
    case "ORDER":
      let arr2 = [...state]
      sort(arr2, action.category, action.order)
      return arr2
    default:
      return state;
  }
};


function sort(arr, category, order) {
  arr.sort((a, b) => {
    let x = category === 'date' ? a[category] : a[category].toLowerCase()
    let y = category === 'date' ? b[category] : b[category].toLowerCase()

    if (category === 'content') {
      // REMOVE STARTING TAG
      x = x.replace(/(<.+?>)/i, '')
      y = y.replace(/(<.+?>)/i, '')
    }

    if (x > y) return order === 'asc' ? 1 : -1
    if (x < y) return order === 'asc' ? -1 : 1
    return 0
  })
}