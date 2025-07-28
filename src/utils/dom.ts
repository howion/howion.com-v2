export const INTERACTION_NODES = [
    'A',
    'BUTTON',
    'INPUT',
    'TEXTAREA',
    'SELECT',
    'LABEL',
    'SPAN',
    'P',
    'SPAN',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'DIM'
]

export function isInteractionNode(name: string): boolean {
    return INTERACTION_NODES.includes(name.toUpperCase())
}
