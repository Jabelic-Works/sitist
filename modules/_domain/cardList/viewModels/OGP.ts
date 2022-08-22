export const getOGP = async url => {
  let images = []
  await fetch(url, { mode: "cors" })
    .then(res => res.text())
    .then(text => {
      const el = new DOMParser().parseFromString(text, "text/html")
      const headEls = el.head.children
      Array.from(headEls).map(v => {
        const prop = v.getAttribute("property")
        if (prop) {
          console.log(prop, v.getAttribute("content"))
          if (prop.includes("image")) images.push(v.getAttribute("content"))
        }
      })
    })
  return images
}
