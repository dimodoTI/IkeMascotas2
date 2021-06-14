/** @format */

import {} from "../css/main.css";
import {} from "../css/media.css";
import {} from "../css/quicksand.css";
import {} from "../css/fontSizes.css";
import {} from "../css/colors.css";
import {} from "../css/shadows.css";
import {} from "../css/imagenes.css";
import { store } from "../src/redux/store";
import { viewManager } from "./views/manager";
import { captureMedia } from "./redux/ui/actions";

import { showScreen } from "./redux/screens/actions";

import { get as getCalendario } from "./redux/calendario/actions";

import { get as getMascotasTipo } from "./redux/mascotastipo/actions";

import { get as getVacunas } from "./redux/vacunas/actions";
import { get as getRazas } from "./redux/razas/actions";

import { getParameterByName } from "./libs/helpers";
import { goNext, goTo, goPrev } from "./redux/routing/actions";
import { login } from "./redux/autorizacion/actions";
import { selectMenu } from "./redux/ui/actions";
import { get as getPublicaciones } from "./redux/publicacion/actions";

store.dispatch(captureMedia());
if (getParameterByName("ticket")) {
    store.dispatch(goTo("crearclave"));
} else {
    if (getParameterByName("user")) {
        store.dispatch(login(getParameterByName("user"), ""));
        store.dispatch(getPublicaciones({ orderby: "tipo,orden" }));
    } else {
        store.dispatch(showScreen("splash"));
    }
}

store.dispatch(
    getCalendario({
        expand: "MascotasTipo($filter=Activo), Vacuna($filter=Activo)",
        filter: "Activo",
    })
);

store.dispatch(
    getMascotasTipo({
        filter: "Activo",
        orderby: "Descripcion",
    })
);

store.dispatch(
    getRazas({
        orderby: "idMascotasTipo,Descripcion",
        filter: "Activo",
    })
);

store.dispatch(
    getVacunas({
        filter: "Activo",
    })
);

/* 

const largeScreenRoute = [
    "1      -opcion 1",
    "2      -opcion 2",
    "3      -opcion 3",
    "3/1    -opcion 31",
    "3/1/1  -opcion 311",
    "3/1/2  -opcion 312",
    "3/1/2/1-opcion 3121",
    "3/1/3  -opcion 313",
    "3/2    -opcion 32",
    "3/2/1  -opcion 321",
    "3/2/2  -opcion 322",
    "3/3    -opcion 33",
    "3/3/1  -opcion 331",
    "4      -opcion 4",
    "5      -opcion 5",
    "5/1    -opcion 51",
    "6      -opcion 6",
    "6/1    -opcion 61"
]


let pointer = 0

const isBrother = (codeA, codeB) => {
    const elementsCodeA = codeA.split("/")
    const elementsCodeB = codeB.split("/")
    elementsCodeA.pop()
    elementsCodeB.pop()
    return elementsCodeA.join() == elementsCodeB.join()
}
const isParent = (currentCode, prevCode) => {
    const tail = currentCode.trim().replace(prevCode.trim(), "").split("/")
    return tail.length == 2 && tail[0] == ""
}

const next = (pointer) => {
    let originalPointer = pointer
    let currentCode = largeScreenRoute[pointer].split("-")[0]
    while (pointer < largeScreenRoute.length - 1) {
        pointer += 1
        let nextCode = largeScreenRoute[pointer].split("-")[0]
        if (isBrother(currentCode, nextCode)) {
            return pointer
        }
    }
    return originalPointer
}
const prev = (pointer) => {
    let currentCode = largeScreenRoute[pointer].split("-")[0]
    while (pointer > 0) {
        pointer -= 1
        let prevCode = largeScreenRoute[pointer].split("-")[0]
        if (isBrother(currentCode, prevCode) || isParent(currentCode, prevCode)) {
            return pointer
        }
    }
    return pointer
}

const goTo = (option) => {
    return largeScreenRoute.findIndex(item => {
        return item.split("-")[1] == option
    })
}

console.log("test Next")
pointer = goTo("opcion 1")
console.log(largeScreenRoute[pointer])
pointer = next(pointer)
console.log(largeScreenRoute[pointer])
pointer = next(pointer)
pointer = goTo("opcion 31")
console.log(largeScreenRoute[pointer])
pointer = next(pointer)
console.log(largeScreenRoute[pointer])
pointer = next(pointer)
console.log(largeScreenRoute[pointer])
pointer = next(pointer)
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])
pointer = prev(pointer)
console.log(largeScreenRoute[pointer])



console.log("test Prev")

pointer = goTo("opcion 1")

pointer = next(pointer)
console.log(largeScreenRoute[pointer])

pointer = next(pointer)
console.log(largeScreenRoute[pointer])

pointer = next(pointer)
console.log(largeScreenRoute[pointer])

pointer = goTo("opcion 3121")
console.log(largeScreenRoute[pointer])

pointer = prev(pointer)
console.log(largeScreenRoute[pointer])

pointer = prev(pointer)
console.log(largeScreenRoute[pointer])

pointer = prev(pointer)
console.log(largeScreenRoute[pointer])

pointer = next(pointer)
console.log(largeScreenRoute[pointer])

pointer = next(pointer)
console.log(largeScreenRoute[pointer]) */
