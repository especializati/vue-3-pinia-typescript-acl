import { userHasPermission } from "@/utils/helpers";
import { Directive, DirectiveBinding } from "vue";

export const can: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        if (!userHasPermission(binding.value)) {
            el.style.display = 'none'
        }
    },
}