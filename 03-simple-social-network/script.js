const d = document,
  ls = localStorage;
const $form = d.getElementById("thinking");
const $formEdit = d.querySelector(".form-edit");
const $modal = d.querySelector(".dialog-edit");
const $btnCloseModal = d.querySelector(".dialog-close");
const $template = d.getElementById("template-publication").content;
const $main = d.querySelector("main");
let { updateData, data } = useData();

function useData() {
  this.data = JSON.parse(ls.getItem("data"))?.data || [];
  return {
    updateData: (newData) => {
      this.data = newData;
      ls.setItem("data", JSON.stringify(this.data));
      return this.data.data;
    },
    data: this.data,
  };
}

const addComment = (e) => {
  e.preventDefault();
  let dataPublication = {
    title: $form.title.value,
    content: $form.content.value,
    reaction: false,
  };
  $form.reset();
  data = updateData({ data: [...data, dataPublication] });
  console.log(data);
  drawPublication(dataPublication, $main, data.length - 1);
};

const editEvent = (e, parent) => {
  let i = parent.dataset.index;
  $formEdit.title.value = data[i].title;
  $formEdit.content.value = data[i].content;
  $modal.dataset.id = i;
  $modal.showModal();
  $modal.classList.toggle("open");
};
const deleteEvent = (e, parent) => {
  let i = parent.dataset.index;
  d.querySelector(`[data-index="${i}"]`).remove();
  d.querySelectorAll("[data-index]").forEach((el, i) => (el.dataset.index = i));
  data = data.filter((el, index) => index != i);
  updateData({ data });
};

const reactionEvent = (e, parent) => {
  let i = +parent.dataset.index;
  if (e.target.matches(".liked")) {
    data[i].reaction = false;
  } else {
    data[i].reaction = true;
  }
  e.target.classList.toggle("liked");
  updateData({ data });
};

const drawPublication = (dataPublication, parent, index) => {
  const $clone = $template.cloneNode(true);
  const $article = $clone.querySelector(".art-publication");
  $article.dataset.index = index;
  $clone.querySelector(".publication-title").innerText = dataPublication.title;
  $clone.querySelector(".publication-content").innerText =
    dataPublication.content;
  let reaction = $clone.querySelector(".publication-reaction");
  if (dataPublication.reaction) {
    reaction.classList.add("liked");
  }
  reaction.addEventListener("click", (e) => {
    reactionEvent(e, $article);
  });
  $clone.querySelector(".publication-edit").addEventListener("click", (e) => {
    editEvent(e, $article);
  });
  $clone.querySelector(".publication-delete").addEventListener("click", (e) => {
    deleteEvent(e, $article);
  });
  parent.appendChild($clone);
};

const render = (data) => {
  data.forEach((el, i) => {
    drawPublication(el, $main, i);
  });
};

d.addEventListener("DOMContentLoaded", (e) => {
  render(data);
});

$form.addEventListener("submit", addComment);
$formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  let i = +$modal.dataset.id;
  data[i].title = $formEdit.title.value;
  data[i].content = $formEdit.content.value;
  updateData({ data });
  d.querySelector(`[data-index="${i}"] strong`).innerText =
    $formEdit.title.value;
  d.querySelector(`[data-index="${i}"] p.publication-content`).innerText =
    $formEdit.content.value;
  $modal.classList.toggle("open");
  $modal.close();
});

$btnCloseModal.addEventListener("click", (e) => {
  $formEdit.title.value = "";
  $formEdit.content.value = "";
  $modal.close();
  $modal.classList.toggle("open");
});
