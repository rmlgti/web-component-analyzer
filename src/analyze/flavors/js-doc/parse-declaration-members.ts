import { SimpleTypeKind } from "ts-simple-type";
import { Node } from "typescript";
import { ComponentMember, ComponentMemberAttribute, ComponentMemberProperty } from "../../types/component-member";
import { parseJsDocTypeString } from "../../util/js-doc-util";
import { ParseComponentMembersContext } from "../parse-component-flavor";
import { parseJsDocForNode } from "./helper";

/**
 * Parses @prop | @property js doc annotations on interface/class-like nodes.
 * @param node
 * @param context
 */
export function parseDeclarationMembers(node: Node, context: ParseComponentMembersContext): ComponentMember[] | undefined {
	const { ts } = context;

	if (ts.isInterfaceDeclaration(node) || ts.isClassDeclaration(node)) {
		const properties = parseJsDocForNode(
			node,
			["prop", "property"],
			(tagNode, parsed) => {
				if (parsed.name != null) {
					return {
						kind: "property",
						propName: parsed.name,
						jsDoc: parsed.comment != null ? { comment: parsed.comment } : undefined,
						type: (parsed.type && parseJsDocTypeString(parsed.type)) || { kind: SimpleTypeKind.ANY },
						node: tagNode
					} as ComponentMemberProperty;
				}
			},
			context
		);

		const attributes = parseJsDocForNode(
			node,
			["attr", "attribute"],
			(tagNode, parsed) => {
				if (parsed.name != null) {
					return {
						kind: "attribute",
						attrName: parsed.name,
						jsDoc: parsed.comment && { comment: parsed.comment },
						type: (parsed.type && parseJsDocTypeString(parsed.type)) || { kind: SimpleTypeKind.ANY },
						node: tagNode
					} as ComponentMemberAttribute;
				}
			},
			context
		);

		if (attributes != null || properties != null) {
			return [...(attributes || []), ...(properties || [])];
		}
	}

	return undefined;
}
