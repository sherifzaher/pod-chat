import { ContextMenuStyles } from '../../utils/styles';

type Props = {
  points: { x: number; y: number };
};

export default function SelectedParticipantContextMenu({ points }: Props) {
  return (
    <ContextMenuStyles top={points.y} left={points.x}>
      <ul>
        <li>Kick User</li>
        <li>Ban User</li>
        <li>Mute User</li>
        <li>Transfer Owner</li>
      </ul>
    </ContextMenuStyles>
  );
}
