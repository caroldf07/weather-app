export function LoadingSpinner() {
  return (
    <div className="loading-spinner" role="status" aria-label="Carregando...">
      <div className="spinner"></div>
      <span>Buscando previsão do tempo...</span>
    </div>
  )
}
