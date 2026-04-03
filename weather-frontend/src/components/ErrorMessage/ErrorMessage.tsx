interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-message" role="alert" data-testid="error-message">
      ⚠️ {message}
    </div>
  )
}
