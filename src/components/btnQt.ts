export function buttonQt() {
  return `
    <div class="input-group mb-3">
    <button class="btn btn-outline-danger w-25 fs-5" type="button" id="btnRemove">-</button>
    <input
      type="number"
      id="orderQt"
      min="1"
      value="1"
      step="1"
      class="form-control w-25 text-center"
      placeholder=""
      aria-label="Example text with button addon"
      aria-describedby="button-addon1"
      disabled />
    <button class="btn btn-outline-success w-25 fs-5" type="button" id="btnAdd">+</button>
  </div>`;
}
