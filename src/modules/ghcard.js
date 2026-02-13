import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";
import { createElement } from "@wordpress/element";

export default function () {
    registerBlockType("hachimi/ghcard", {
        apiVersion: 2,
        title: "github仓库卡片",
        icon: createElement("i", { className: "fa-brands fa-github" }),
        category: "sakurairo",

        attributes: {
            path: {
                type: "string",
                default: "",
            },
        },

        edit({ attributes, setAttributes }) {
            const { path } = attributes;

            const blockProps = useBlockProps();

            return (
                <div {...blockProps}>
                    <div
                        style={{
                            border: "1px solid #ddd",
                            padding: "16px",
                            borderRadius: "6px",
                            background: "#fff",
                        }}
                    >
                        <div
                            style={{
                                fontWeight: "600",
                                fontSize: "16px",
                                marginBottom: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <i className="fa-brands fa-github"></i>
                            GitHub 仓库卡片
                        </div>

                        <TextControl
                            label="仓库地址"
                            help="示例：author/repo 或 https://github.com/author/repo"
                            value={path}
                            onChange={(value) => setAttributes({ path: value })}
                        />
                    </div>
                </div>
            );
        },

        save({ attributes }) {
            const { path } = attributes;

            return (
                <div className="hachimi-ghcard-block">
                    {`[ghcard path="${path}"]`}
                </div>
            );
        },
    });
}
