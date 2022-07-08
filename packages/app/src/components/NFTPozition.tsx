export default function NFTPozition({ link, onClick }: { link: string; onClick?: () => void }) {
  return <div>{onClick ? <img src={link} onClick={onClick} style={{ cursor: 'pointer' }} /> : <img src={link} />}</div>;
}
