import type React from "react"

interface UserBadgeProps {
  letter: string
  number: number
  color: "blue" | "gray"
}

const UserBadge: React.FC<UserBadgeProps> = ({ letter, number, color }) => {
  return (
    <div className={`user-badge ${color === "blue" ? "user-badge-blue" : "user-badge-gray"}`}>
      <div className="user-avatar">
        <span className="user-letter">{letter}</span>
      </div>
      <span className="user-number">{number}</span>
    </div>
  )
}

export default UserBadge
