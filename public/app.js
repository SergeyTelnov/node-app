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

async function changeNote(id, title) {
  return await fetch("/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, title }),
  });
}
