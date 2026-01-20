import { registerBlockType } from "@wordpress/blocks";
import {
    useBlockProps,
    BlockControls,
    RichText,
} from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarDropdownMenu } from "@wordpress/components";
import { Fragment, RawHTML } from "@wordpress/element";
import createI18n from "../i18n";

let lang = createI18n({
    "zh-CN": {
        blockTitle: "提示块",
        typeTitle: "提示类型",
        placeholder: "此处输入内容...",
        task: "任务提示",
        warning: "警告提示",
        noway: "禁止提示",
        buy: "允许提示",
    },
    "zh-TW": {
        blockTitle: "提示區塊",
        typeTitle: "提示類型",
        placeholder: "此處輸入內容...",
        task: "任務提示",
        warning: "警告提示",
        noway: "禁止提示",
        buy: "允許提示",
    },
    ja: {
        blockTitle: "ヒントブロック",
        typeTitle: "ヒントタイプ",
        placeholder: "ここに内容を入力...",
        task: "タスク",
        warning: "警告",
        noway: "禁止",
        buy: "許可",
    },
    en: {
        blockTitle: "Callout Block",
        typeTitle: "Callout Type",
        placeholder: "Enter content here...",
        task: "Task",
        warning: "Warning",
        noway: "Forbidden",
        buy: "Allowed",
    },
});

const TYPES = {
    task: {
        label: lang.taskLabel,
        icon: '<i class="fa-solid fa-clipboard-list"></i>',
        className: "task",
    },
    warning: {
        label: lang.warningLabel,
        icon: '<i class="fa-solid fa-triangle-exclamation"></i>',
        className: "warning",
    },
    noway: {
        label: lang.nowayLabel,
        icon: '<i class="fa-solid fa-square-xmark"></i>',
        className: "noway",
    },
    buy: {
        label: lang.buyLabel,
        icon: '<i class="fa-solid fa-square-check"></i>',
        className: "buy",
    },
};

function edit({ attributes, setAttributes }) {
    const { content, type, isExample } = attributes;

    if (isExample) {
        return [
            <img
                src="https://docs.fuukei.org/short-code/noway.png"
                alt="预览"
                style={{ width: "100%", height: "auto", display: "block" }}
            />,
            <img
                src="https://docs.fuukei.org/short-code/buy.png"
                alt="预览"
                style={{ width: "100%", height: "auto", display: "block" }}
            />,
            <img
                src="https://docs.fuukei.org/short-code/warn.png"
                alt="预览"
                style={{ width: "100%", height: "auto", display: "block" }}
            />,
        ];
    }

    const blockProps = useBlockProps();
    const typeInfo = TYPES[type];

    return (
        <Fragment>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarDropdownMenu
                        icon="admin-generic"
                        label={lang.typeTitle}
                        controls={Object.entries(TYPES).map(
                            ([value, { label }]) => ({
                                title: label,
                                icon: false,
                                onClick: () => setAttributes({ type: value }),
                                isActive: type === value,
                            }),
                        )}
                    />
                </ToolbarGroup>
            </BlockControls>

            <div
                {...blockProps}
                className={`shortcodestyle ${typeInfo.className}`}
            >
                <RawHTML>{typeInfo.icon}</RawHTML>
                <RichText
                    tagName="span"
                    value={content}
                    onChange={(newContent) =>
                        setAttributes({ content: newContent })
                    }
                    placeholder={lang.placeholder}
                />
            </div>
        </Fragment>
    );
}

export default function noticeBlock() {
    registerBlockType("sakurairo/notice-block", {
        title: lang.blockTitle,
        description: "",
        icon: "format-status",
        category: "sakurairo",
        attributes: {
            content: {
                type: "string",
                source: "html",
                selector: "span",
            },
            type: {
                type: "string",
                default: "task",
            },
            isExample: {
                type: "boolean",
                default: false,
            },
        },
        edit,
        save({ attributes }) {
            const { content, type } = attributes;
            const { icon, className } = TYPES[type];
            return (
                <div className={`shortcodestyle ${className}`}>
                    <RawHTML>{icon}</RawHTML>
                    <RichText.Content tagName="span" value={content} />
                </div>
            );
        },
        example: {
            attributes: {
                isExample: true,
            },
        },
    });
}
