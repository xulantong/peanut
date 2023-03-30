function toggleLoading(el, value) {
    let bg = el.getAttribute("peanut-loading-bg");
    if (bg) {
        el.loading.style.backgroundColor = bg;
    }
    if (value) {
        el.loading.style.display = "flex";
        el.style.position = "relative"
    } else {
        el.loading.style.display = "none";
        el.style.position = el.oldPosition;
    }
}

export default {
    install: function(Vue, opts = {}) {
        Vue.directive('PeanutLoading', {
            bind(element, binding, node) {
                let el = document.createElement("div");
                el.innerHTML = `
                <span class="loading-dot">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </span>`;
                el.className = "disco-loading"
                el.style.display = "none";
                element.appendChild(el);
                element.loading = el;
                element.oldPosition = element.style.position;
                if (binding.value) {
                    toggleLoading(element, binding.value);
                }
            },
            update(el, binding, node) {
                let {value} = binding;
                toggleLoading(el, value)
            }
        })
    }
}
