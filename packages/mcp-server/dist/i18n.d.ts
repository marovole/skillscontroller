/**
 * Internationalization (i18n) Module
 *
 * Provides multi-language support for English and Chinese
 */
export type Language = "en" | "zh" | "auto";
/**
 * Detects the language of a given text
 * Uses a simple heuristic based on character ranges
 */
export declare function detectLanguage(text: string): Language;
/**
 * Gets the localized text based on detected language
 */
export declare function t(key: string | TranslationKey, locale?: "en" | "zh", fallbackText?: string): string;
export type TranslationKey = "server.starting" | "server.skillsDirs" | "server.scanningDir" | "server.directoryNotFound" | "server.symlinkSkipped" | "server.directoryAccessFailed" | "server.invalidEntryName" | "server.suspiciousPath" | "server.scanFailed" | "server.skillFound" | "server.skillLoadFailed" | "server.skillDuplicateSkipped" | "server.skillsLoaded" | "server.serverStarted" | "intent.primary" | "intent.secondary" | "intent.noMatch" | "intent.unitTestScene" | "intent.integrationTestScene" | "skill.matchResults" | "skill.noMatch" | "skill.excludedByIntent" | "skill.missingRequiredIntent" | "skill.excludedByWord" | "response.noMatch" | "response.noMatchSuggestion" | "response.activated" | "response.instructions" | "response.deactivated" | "response.skillFreed" | "response.notActive" | "response.allDeactivated" | "response.hasActive" | "response.noActive" | "error.pathTraversal" | "error.symlinkEscape" | "error.validationFailed" | "cli.help.title" | "cli.help.subtitle" | "cli.help.usage" | "cli.help.commands" | "cli.help.examples" | "cli.bundles.title" | "cli.bundles.skills" | "cli.bundles.author" | "cli.bundles.invalid" | "cli.install.invalidName" | "cli.install.invalidPath" | "cli.install.notFound" | "cli.install.invalidFormat" | "cli.install.installing" | "cli.install.creatingDir" | "cli.install.skillsSection" | "cli.install.local" | "cli.install.notFoundShort" | "cli.install.pathValidationFailed" | "cli.install.installFailed" | "cli.install.plugin" | "cli.install.generatingIndex" | "cli.install.complete.title" | "cli.install.complete.bundle" | "cli.install.complete.skillCount" | "cli.install.complete.launch" | "cli.active.notInstalled" | "cli.active.suggestion" | "cli.active.title" | "cli.active.bundle" | "cli.active.installedAt" | "cli.active.installedSkills" | "validation.skillNameEmpty" | "validation.skillNameTooLong" | "validation.skillNameInvalid" | "validation.messageEmpty" | "validation.messageTooLong" | "validation.keywordEmpty" | "validation.keywordTooLong";
export declare function formatMessage(key: string, params: Record<string, string | number>, locale?: "en" | "zh"): string;
//# sourceMappingURL=i18n.d.ts.map