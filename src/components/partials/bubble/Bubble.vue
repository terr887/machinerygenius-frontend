<template>
    <div class="max-w-full overflow-hidden rounded-lg shadow-sm leading-relaxed text-sm sm:text-base break-words" :class="bubbleClasses"
        :style="bubbleStyle">
        <!-- Main Summary -->

        <slot name="more_context" />

        <div v-if="message.content && isUser" class="mb-3 whitespace-pre-line">
            {{ message.content }}
        </div>

        <div v-else-if="message.content" class="message-content mb-3">
            <template v-for="(segment, index) in contentSegments" :key="index">
                <div v-if="segment.type === 'text'" class="message-text whitespace-pre-line">
                    {{ segment.content }}
                </div>

                <div v-else class="message-table-wrap" role="region" aria-label="Answer table">
                    <table class="message-table">
                        <thead>
                            <tr>
                                <th v-for="(header, headerIndex) in segment.headers" :key="headerIndex" scope="col">
                                    {{ header }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, rowIndex) in segment.rows" :key="rowIndex">
                                <td
                                    v-for="(cell, cellIndex) in row"
                                    :key="`${rowIndex}-${cellIndex}`"
                                    :data-label="segment.headers[cellIndex] || `Column ${cellIndex + 1}`"
                                >
                                    {{ cell }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
        </div>

        <!-- Advice list slot / fallback -->
        <slot name="advice" />

        <!-- Followups slot / fallback -->
        <slot name="followups" />
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    message: { type: Object, required: true },
    isUser: { type: Boolean, default: false }
})

const bubbleClasses = computed(() => {
    const base = 'px-3 py-2 sm:px-4 sm:py-3 text-[14px]'
    const user = 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
    const assistant = 'bg-white text-gray-800 border border-gray-100'
    const userSpacing = 'ml-0 sm:ml-10'
    const assistantSpacing = 'mr-0 sm:mr-10'
    return `${base} ${props.isUser ? `${user} ${userSpacing}` : `${assistant} ${assistantSpacing}`}`
})

const bubbleStyle = {
    'box-shadow': '0 2px 8px rgba(18,20,25,0.04)'
}

const splitTableRow = (line) => {
    return line
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((cell) => cell.trim())
}

const isTableSeparator = (line) => {
    const cells = splitTableRow(line)

    return cells.length > 1 && cells.every((cell) => /^:?-{3,}:?$/.test(cell))
}

const isTableRow = (line) => {
    return line.trim().startsWith('|') && line.trim().endsWith('|') && splitTableRow(line).length > 1
}

const normalizeRow = (row, length) => {
    return Array.from({ length }, (_, index) => row[index] || '')
}

const contentSegments = computed(() => {
    const lines = String(props.message.content || '').split('\n')
    const segments = []
    let textBuffer = []
    let index = 0

    const flushText = () => {
        const content = textBuffer.join('\n').trim()
        if (content) {
            segments.push({ type: 'text', content })
        }
        textBuffer = []
    }

    while (index < lines.length) {
        const headerLine = lines[index]
        const separatorLine = lines[index + 1]

        if (isTableRow(headerLine) && separatorLine && isTableSeparator(separatorLine)) {
            flushText()

            const headers = splitTableRow(headerLine)
            const rows = []
            index += 2

            while (index < lines.length && isTableRow(lines[index])) {
                rows.push(normalizeRow(splitTableRow(lines[index]), headers.length))
                index += 1
            }

            segments.push({
                type: 'table',
                headers,
                rows,
            })
            continue
        }

        textBuffer.push(headerLine)
        index += 1
    }

    flushText()

    return segments
})
</script>

<style scoped>
.message-content {
    display: grid;
    gap: 0.75rem;
    min-width: 0;
}

.message-text {
    min-width: 0;
    overflow-wrap: anywhere;
}

.message-table-wrap {
    max-width: 100%;
    overflow-x: auto;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #fff;
    -webkit-overflow-scrolling: touch;
    min-width: 0;
}

.message-table {
    width: 100%;
    min-width: 0;
    border-collapse: collapse;
    font-size: 0.875rem;
    line-height: 1.4;
}

.message-table th,
.message-table td {
    padding: 0.55rem 0.65rem;
    text-align: left;
    vertical-align: top;
    overflow-wrap: anywhere;
    border-bottom: 1px solid #f1f5f9;
}

.message-table th {
    background: #f8fafc;
    color: #111827;
    font-weight: 700;
}

.message-table tr:last-child td {
    border-bottom: 0;
}

@media (max-width: 640px) {
    .message-table-wrap {
        overflow: visible;
        border: 0;
        background: transparent;
    }

    .message-table {
        min-width: 0;
        display: block;
        font-size: 0.8125rem;
    }

    .message-table thead {
        display: none;
    }

    .message-table tbody,
    .message-table tr,
    .message-table td {
        display: block;
        width: 100%;
    }

    .message-table tr {
        padding: 0.6rem;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        background: #fff;
    }

    .message-table tr + tr {
        margin-top: 0.5rem;
    }

    .message-table td {
        padding: 0.4rem 0;
        border-bottom: 1px solid #f1f5f9;
    }

    .message-table td:last-child {
        border-bottom: 0;
    }

    .message-table td::before {
        content: attr(data-label);
        display: block;
        margin-bottom: 0.15rem;
        color: #6b7280;
        font-size: 0.7rem;
        font-weight: 700;
        line-height: 1.2;
        text-transform: uppercase;
    }
}
</style>
