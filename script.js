class PSATokenExchange {
    constructor() {
        this.userBalance = 25000;
        this.portfolio = {};
        this.currentPlayer = null;
        this.isTrading = false;
        this.currentChart = null;
        this.currentPeriod = '7d';
        
        this.players = [
            {
                id: 1,
                name: "Ali Farag",
                country: "Egypt",
                ranking: 1,
                tokenPrice: 85.40,
                availableTokens: 10000,
                priceChange: 3.2,
                marketCap: 854000,
                volume24h: 45000
            },
            {
                id: 2,
                name: "Paul Coll",
                country: "New Zealand",
                ranking: 2,
                tokenPrice: 78.60,
                availableTokens: 10000,
                priceChange: -1.8,
                marketCap: 786000,
                volume24h: 38000
            },
            {
                id: 3,
                name: "Mohamed ElShorbagy",
                country: "Egypt",
                ranking: 3,
                tokenPrice: 72.90,
                availableTokens: 10000,
                priceChange: 2.1,
                marketCap: 729000,
                volume24h: 42000
            },
            {
                id: 4,
                name: "Diego Elias",
                country: "Peru",
                ranking: 4,
                tokenPrice: 68.30,
                availableTokens: 10000,
                priceChange: 4.7,
                marketCap: 683000,
                volume24h: 35000
            },
            {
                id: 5,
                name: "Mostafa Asal",
                country: "Egypt",
                ranking: 5,
                tokenPrice: 64.20,
                availableTokens: 10000,
                priceChange: 1.9,
                marketCap: 642000,
                volume24h: 31000
            },
            {
                id: 6,
                name: "Joel Makin",
                country: "Wales",
                ranking: 6,
                tokenPrice: 58.80,
                availableTokens: 10000,
                priceChange: -0.5,
                marketCap: 588000,
                volume24h: 28000
            },
            {
                id: 7,
                name: "Marwan ElShorbagy",
                country: "Egypt",
                ranking: 7,
                tokenPrice: 55.40,
                availableTokens: 10000,
                priceChange: 2.8,
                marketCap: 554000,
                volume24h: 25000
            },
            {
                id: 8,
                name: "Spencer Lovejoy",
                country: "USA",
                ranking: 8,
                tokenPrice: 51.70,
                availableTokens: 10000,
                priceChange: 6.2,
                marketCap: 517000,
                volume24h: 32000
            },
            {
                id: 9,
                name: "Tarek Momen",
                country: "Egypt",
                ranking: 9,
                tokenPrice: 47.90,
                availableTokens: 10000,
                priceChange: -2.3,
                marketCap: 479000,
                volume24h: 22000
            },
            {
                id: 10,
                name: "Mazen Hesham",
                country: "Egypt",
                ranking: 10,
                tokenPrice: 44.60,
                availableTokens: 10000,
                priceChange: 1.4,
                marketCap: 446000,
                volume24h: 19000
            },
            {
                id: 11,
                name: "Greg Lobban",
                country: "Scotland",
                ranking: 11,
                tokenPrice: 41.20,
                availableTokens: 10000,
                priceChange: 3.1,
                marketCap: 412000,
                volume24h: 18000
            },
            {
                id: 12,
                name: "Omar Mosaad",
                country: "Egypt",
                ranking: 12,
                tokenPrice: 38.50,
                availableTokens: 10000,
                priceChange: -1.2,
                marketCap: 385000,
                volume24h: 16000
            },
            {
                id: 13,
                name: "Miguel Rodriguez",
                country: "Colombia",
                ranking: 13,
                tokenPrice: 35.80,
                availableTokens: 10000,
                priceChange: 2.7,
                marketCap: 358000,
                volume24h: 15000
            },
            {
                id: 14,
                name: "Richie Fallows",
                country: "England",
                ranking: 14,
                tokenPrice: 33.40,
                availableTokens: 10000,
                priceChange: 4.3,
                marketCap: 334000,
                volume24h: 14000
            },
            {
                id: 15,
                name: "Cesar Salazar",
                country: "Mexico",
                ranking: 15,
                tokenPrice: 31.20,
                availableTokens: 10000,
                priceChange: -0.8,
                marketCap: 312000,
                volume24h: 12000
            }
        ];
        
        this.generateHistoricalData();
        this.generateTournamentData();
        this.init();
    }
    
    generateHistoricalData() {
        this.players.forEach(player => {
            player.priceHistory = this.generatePriceHistory(player.tokenPrice);
        });
    }
    
    generatePriceHistory(currentPrice) {
        const history = {
            '7d': [],
            '30d': [],
            '90d': [],
            '1y': []
        };
        
        const periods = {
            '7d': { days: 7, interval: 6 },
            '30d': { days: 30, interval: 2 },
            '90d': { days: 90, interval: 3 },
            '1y': { days: 365, interval: 14 }
        };
        
        Object.keys(periods).forEach(period => {
            const { days, interval } = periods[period];
            let price = currentPrice * (0.7 + Math.random() * 0.6);
            
            for (let i = days; i >= 0; i -= interval) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                
                const volatility = 0.08;
                const change = (Math.random() - 0.5) * volatility;
                price = Math.max(5, price * (1 + change));
                
                if (i === 0) price = currentPrice;
                
                history[period].push({
                    date: date.toISOString().split('T')[0],
                    price: parseFloat(price.toFixed(2))
                });
            }
        });
        
        return history;
    }
    
    generateTournamentData() {
        this.players.forEach(player => {
            player.tournaments = this.generateTournaments(player);
        });
    }
    
    generateTournaments(player) {
        const tournaments = [];
        const tournamentTypes = [
            { name: 'PSA World Championships', prize: 150000, weight: 0.05 },
            { name: 'CIB Egyptian Open', prize: 100000, weight: 0.08 },
            { name: 'British Open', prize: 80000, weight: 0.1 },
            { name: 'US Open', prize: 75000, weight: 0.12 },
            { name: 'PSA Platinum', prize: 50000, weight: 0.15 },
            { name: 'PSA Gold', prize: 25000, weight: 0.25 },
            { name: 'PSA Silver', prize: 15000, weight: 0.35 },
            { name: 'PSA Bronze', prize: 8000, weight: 0.4 }
        ];
        
        const rankingMultiplier = Math.max(0.1, 1 - (player.ranking - 1) * 0.06);
        
        for (let i = 12; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            
            const monthlyTournaments = Math.floor(Math.random() * 3) + 1;
            
            for (let t = 0; t < monthlyTournaments; t++) {
                const tournament = tournamentTypes[Math.floor(Math.random() * tournamentTypes.length)];
                
                if (Math.random() < tournament.weight * rankingMultiplier) {
                    const baseWinnings = tournament.prize * rankingMultiplier;
                    const variance = 0.3 + Math.random() * 0.7;
                    const winnings = baseWinnings * variance;
                    const perToken = winnings / 10000;
                    
                    const tournamentDate = new Date(date);
                    tournamentDate.setDate(tournamentDate.getDate() + Math.floor(Math.random() * 28));
                    
                    const results = ['Winner', 'Runner-up', 'Semi-final', 'Quarter-final', 'Round 2', 'Round 1'];
                    const resultIndex = Math.floor(Math.random() * Math.min(4, results.length));
                    const result = results[resultIndex];
                    
                    tournaments.push({
                        date: tournamentDate.toISOString().split('T')[0],
                        tournament: tournament.name,
                        result: result,
                        totalWinnings: parseFloat(winnings.toFixed(2)),
                        perToken: parseFloat(perToken.toFixed(4)),
                        month: tournamentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    });
                }
            }
        }
        
        return tournaments.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    init() {
        this.renderPlayers();
        this.setupEventListeners();
        this.updateUserBalance();
        this.simulateMarketMovement();
    }
    
    renderPlayers() {
        const container = document.getElementById('players-container');
        container.innerHTML = '';
        
        this.players.forEach(player => {
            const playerCard = this.createPlayerCard(player);
            container.appendChild(playerCard);
        });
    }
    
    createPlayerCard(player) {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.onclick = () => this.openTradingModal(player);
        
        const initials = player.name.split(' ').map(n => n[0]).join('');
        const priceChangeClass = player.priceChange >= 0 ? 'positive' : 'negative';
        const priceChangeSymbol = player.priceChange >= 0 ? '+' : '';
        
        card.innerHTML = `
            <div class="player-header">
                <div class="player-avatar">${initials}</div>
                <div class="player-info">
                    <h3>${player.name}</h3>
                    <p>${player.country} • Rank #${player.ranking}</p>
                </div>
            </div>
            <div class="player-stats">
                <div class="stat-item">
                    <span class="label">Token Price</span>
                    <span class="value">$${player.tokenPrice.toFixed(2)}</span>
                </div>
                <div class="stat-item">
                    <span class="label">24h Change</span>
                    <span class="value price-change ${priceChangeClass}">
                        ${priceChangeSymbol}${player.priceChange.toFixed(1)}%
                    </span>
                </div>
                <div class="stat-item">
                    <span class="label">Available</span>
                    <span class="value">${player.availableTokens.toLocaleString()}</span>
                </div>
                <div class="stat-item">
                    <span class="label">Market Cap</span>
                    <span class="value">$${(player.marketCap / 1000).toFixed(0)}K</span>
                </div>
            </div>
        `;
        
        return card;
    }
    
    openTradingModal(player) {
        this.currentPlayer = player;
        const modal = document.getElementById('trading-modal');
        
        document.getElementById('modal-player-name').textContent = player.name;
        document.getElementById('modal-player-country').textContent = player.country;
        document.getElementById('modal-player-ranking').textContent = player.ranking;
        document.getElementById('modal-token-price').textContent = player.tokenPrice.toFixed(2);
        document.getElementById('modal-available-tokens').textContent = player.availableTokens.toLocaleString();
        
        const playerImage = document.getElementById('modal-player-image');
        playerImage.style.background = '#ff6b35';
        playerImage.style.width = '100px';
        playerImage.style.height = '100px';
        playerImage.style.borderRadius = '50%';
        playerImage.style.display = 'flex';
        playerImage.style.alignItems = 'center';
        playerImage.style.justifyContent = 'center';
        playerImage.style.color = 'white';
        playerImage.style.fontWeight = 'bold';
        playerImage.style.fontSize = '1.5rem';
        playerImage.textContent = player.name.split(' ').map(n => n[0]).join('');
        
        this.updateTournamentData(player);
        modal.style.display = 'block';
        this.updateTradeCalculation();
    }
    
    setupEventListeners() {
        const modal = document.getElementById('trading-modal');
        const closeBtn = document.querySelector('.close');
        const buyBtn = document.getElementById('buy-btn');
        const sellBtn = document.getElementById('sell-btn');
        const quantityInput = document.getElementById('token-quantity');
        const executeBtn = document.getElementById('execute-trade');
        
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            if (this.currentChart) {
                this.currentChart.destroy();
                this.currentChart = null;
            }
        };
        
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                if (this.currentChart) {
                    this.currentChart.destroy();
                    this.currentChart = null;
                }
            }
        };
        
        buyBtn.onclick = () => {
            buyBtn.classList.add('active');
            sellBtn.classList.remove('active');
            executeBtn.textContent = 'Buy Tokens';
            this.isTrading = false;
            this.updateTradeCalculation();
        };
        
        sellBtn.onclick = () => {
            sellBtn.classList.add('active');
            buyBtn.classList.remove('active');
            executeBtn.textContent = 'Sell Tokens';
            this.isTrading = true;
            this.updateTradeCalculation();
        };
        
        quantityInput.addEventListener('input', () => {
            this.updateTradeCalculation();
        });
        
        executeBtn.onclick = () => {
            this.executeTrade();
        };
        
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });
        
        document.querySelectorAll('.chart-period').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const period = e.target.dataset.period;
                this.updateChartPeriod(period);
            });
        });
    }
    
    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        if (tabName === 'chart') {
            setTimeout(() => this.renderChart(), 100);
        }
    }
    
    renderChart() {
        const canvas = document.getElementById('price-chart');
        const ctx = canvas.getContext('2d');
        
        if (this.currentChart) {
            this.currentChart.destroy();
        }
        
        const data = this.currentPlayer.priceHistory[this.currentPeriod];
        
        this.currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(point => {
                    const date = new Date(point.date);
                    return date.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                    });
                }),
                datasets: [{
                    label: 'Token Price',
                    data: data.map(point => point.price),
                    borderColor: '#ff6b35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#ff6b35',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toFixed(0);
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
    
    updateChartPeriod(period) {
        this.currentPeriod = period;
        
        document.querySelectorAll('.chart-period').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-period="${period}"]`).classList.add('active');
        
        if (this.currentChart) {
            this.renderChart();
        }
    }
    
    updateTournamentData(player) {
        const tournaments = player.tournaments;
        const totalWinnings = tournaments.reduce((sum, tournament) => sum + tournament.totalWinnings, 0);
        const lastTournament = tournaments.length > 0 ? tournaments[0] : null;
        const annualYield = ((totalWinnings / 10000) / player.tokenPrice) * 100;
        
        document.getElementById('total-payouts').textContent = `$${totalWinnings.toFixed(0)}`;
        document.getElementById('last-payout').textContent = lastTournament ? `$${lastTournament.totalWinnings.toFixed(0)}` : '$0';
        document.getElementById('annual-yield').textContent = `${annualYield.toFixed(1)}%`;
        
        const payoutList = document.getElementById('payout-list');
        payoutList.innerHTML = '';
        
        tournaments.slice(0, 10).forEach(tournament => {
            const item = document.createElement('div');
            item.className = 'payout-item';
            item.innerHTML = `
                <div>
                    <div class="payout-type">${tournament.tournament}</div>
                    <div class="payout-date">${tournament.result} • ${tournament.month}</div>
                </div>
                <div style="text-align: right;">
                    <div class="payout-amount">$${tournament.totalWinnings.toFixed(0)}</div>
                    <div class="payout-per-token">$${tournament.perToken.toFixed(4)}/token</div>
                </div>
            `;
            payoutList.appendChild(item);
        });
    }
    
    updateTradeCalculation() {
        const quantity = parseInt(document.getElementById('token-quantity').value) || 0;
        const totalCost = quantity * this.currentPlayer.tokenPrice;
        document.getElementById('total-cost').textContent = totalCost.toFixed(2);
    }
    
    executeTrade() {
        const quantity = parseInt(document.getElementById('token-quantity').value);
        const player = this.currentPlayer;
        const totalCost = quantity * player.tokenPrice;
        
        if (!quantity || quantity <= 0) {
            alert('Please enter a valid quantity');
            return;
        }
        
        if (this.isTrading) {
            const owned = this.portfolio[player.id]?.quantity || 0;
            if (quantity > owned) {
                alert('You don\'t own enough tokens to sell');
                return;
            }
            
            this.userBalance += totalCost;
            this.portfolio[player.id].quantity -= quantity;
            if (this.portfolio[player.id].quantity === 0) {
                delete this.portfolio[player.id];
            }
            
            const playerData = this.players.find(p => p.id === player.id);
            playerData.availableTokens += quantity;
            
            alert(`Successfully sold ${quantity} tokens for $${totalCost.toFixed(2)}`);
        } else {
            if (totalCost > this.userBalance) {
                alert('Insufficient balance');
                return;
            }
            
            if (quantity > player.availableTokens) {
                alert('Not enough tokens available');
                return;
            }
            
            this.userBalance -= totalCost;
            
            if (!this.portfolio[player.id]) {
                this.portfolio[player.id] = {
                    player: player,
                    quantity: 0,
                    avgPrice: 0
                };
            }
            
            const currentOwned = this.portfolio[player.id].quantity;
            const currentAvgPrice = this.portfolio[player.id].avgPrice;
            const newAvgPrice = (currentOwned * currentAvgPrice + quantity * player.tokenPrice) / (currentOwned + quantity);
            
            this.portfolio[player.id].quantity += quantity;
            this.portfolio[player.id].avgPrice = newAvgPrice;
            
            const playerData = this.players.find(p => p.id === player.id);
            playerData.availableTokens -= quantity;
            
            alert(`Successfully purchased ${quantity} tokens for $${totalCost.toFixed(2)}`);
        }
        
        this.updateUserBalance();
        this.updatePortfolio();
        this.renderPlayers();
        document.getElementById('trading-modal').style.display = 'none';
        document.getElementById('token-quantity').value = '';
        
        if (this.currentChart) {
            this.currentChart.destroy();
            this.currentChart = null;
        }
    }
    
    updateUserBalance() {
        document.getElementById('user-balance').textContent = this.userBalance.toFixed(2);
    }
    
    updatePortfolio() {
        const container = document.getElementById('portfolio-container');
        
        if (Object.keys(this.portfolio).length === 0) {
            container.innerHTML = '<p>No tokens owned yet. Start trading to build your portfolio!</p>';
            return;
        }
        
        let html = '';
        Object.values(this.portfolio).forEach(holding => {
            const currentValue = holding.quantity * holding.player.tokenPrice;
            const totalInvested = holding.quantity * holding.avgPrice;
            const profitLoss = currentValue - totalInvested;
            const profitLossPercent = (profitLoss / totalInvested) * 100;
            const profitLossClass = profitLoss >= 0 ? 'positive' : 'negative';
            
            html += `
                <div class="portfolio-item">
                    <div class="portfolio-info">
                        <h4>${holding.player.name}</h4>
                        <p>${holding.quantity} tokens @ avg $${holding.avgPrice.toFixed(2)}</p>
                    </div>
                    <div class="portfolio-value">
                        <div class="tokens">$${currentValue.toFixed(2)}</div>
                        <div class="value price-change ${profitLossClass}">
                            ${profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(2)} (${profitLossPercent.toFixed(1)}%)
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    simulateMarketMovement() {
        setInterval(() => {
            this.players.forEach(player => {
                const volatility = 0.03;
                const change = (Math.random() - 0.5) * volatility;
                const newPrice = player.tokenPrice * (1 + change);
                
                player.priceChange = ((newPrice - player.tokenPrice) / player.tokenPrice) * 100;
                player.tokenPrice = Math.max(5, newPrice);
                player.marketCap = player.tokenPrice * 10000;
                player.volume24h = Math.max(5000, player.volume24h * (0.9 + Math.random() * 0.2));
            });
            
            this.renderPlayers();
            this.updatePortfolio();
        }, 6000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PSATokenExchange();
});