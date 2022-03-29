document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "change") {
    const id = event.target.dataset.id;
    let newNote = prompt("Введите новое название", event.target.dataset.title);
    changeNote(id, newNote);
  }
});

async function remove(id) {
  return await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function changeNote(id, data) {
  return await fetch(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(`{ title: ${data} , id: ${id} }`),
  });
}
