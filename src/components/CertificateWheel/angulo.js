/**
 * O ângulo equivalente a `alvo` mais perto de `atual`.
 *
 * Ângulo é circular: 350° e -10° são o mesmo lugar, mas tratados como
 * números diferentes a roda dá quase uma volta inteira para chegar a uma
 * carta vizinha. Somar a quantidade inteira de voltas mais próxima garante
 * que o caminho nunca passe de meia volta.
 *
 * Mora fora do componente porque arquivo que exporta função e componente
 * junto quebra o fast refresh do Vite.
 */
export const anguloMaisProximo = (atual, alvo) =>
  alvo + Math.round((atual - alvo) / 360) * 360;
