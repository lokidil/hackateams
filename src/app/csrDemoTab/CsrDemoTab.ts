import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/csrDemoTab/index.html")
@PreventIframe("/csrDemoTab/config.html")
@PreventIframe("/csrDemoTab/remove.html")
export class CsrDemoTab {
}
