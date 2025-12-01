
export default function Text({ text, color }: {
    text: string,
    color?: string
}) {
    return <div style={{
        fontSize: '20px',
        color: color ? color : 'blue',
    }}>{text}</div>
}