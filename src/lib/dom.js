/**
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

const waitContainer = async (selector, { timeoutMs = 10000, intervalMs = 50 } = {}) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()

    const execute = () => {
      const container = document.querySelector(selector)

      if (container) {
        resolve(container)
        return
      }

      if (Date.now() - startTime >= timeoutMs) {
        reject(new Error(`Container not found for selector "${selector}"`))
        return
      }

      setTimeout(execute, intervalMs)
    }

    execute()
  })
}

const createElement = (tagName, attributes) => {
  const element = document.createElement(tagName)

  if (typeof attributes === 'object') {
    for (let i in attributes) {
      if (i === 'text') {
        element.textContent = attributes[i]
      } else if (i === 'html') {
        element.innerHTML = attributes[i]
      } else {
        element.setAttribute(i, attributes[i])
      }
    }
  }

  return element
}

export { waitContainer, createElement }
